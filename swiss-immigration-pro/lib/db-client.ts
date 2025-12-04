import { query } from './db'

// Query builder class for method chaining
class QueryBuilder {
  private table: string
  private columns: string
  private conditions: Array<{ type: string; column: string; value: any }> = []
  private orderBy?: { column: string; ascending: boolean }
  private limitCount?: number
  private isCount: boolean = false

  constructor(table: string, columns: string = '*', options?: { count?: 'exact' | 'estimated' | 'planned', head?: boolean }) {
    this.table = table
    this.columns = columns
    this.isCount = options?.count === 'exact' && options?.head === true
  }

  eq(column: string, value: any): this {
    this.conditions.push({ type: 'eq', column, value })
    return this
  }

  gt(column: string, value: any): this {
    this.conditions.push({ type: 'gt', column, value })
    return this
  }

  gte(column: string, value: any): this {
    this.conditions.push({ type: 'gte', column, value })
    return this
  }

  order(column: string, options?: { ascending?: boolean }): this {
    this.orderBy = { column, ascending: options?.ascending !== false }
    return this
  }

  limit(count: number): this {
    this.limitCount = count
    return this
  }

  private buildWhereClause(): { sql: string; params: any[] } {
    if (this.conditions.length === 0) {
      return { sql: '', params: [] }
    }

    const whereParts: string[] = []
    const params: any[] = []
    let paramIndex = 1

    for (const condition of this.conditions) {
      if (condition.type === 'eq') {
        whereParts.push(`${condition.column} = $${paramIndex}`)
        params.push(condition.value)
        paramIndex++
      } else if (condition.type === 'gt') {
        whereParts.push(`${condition.column} > $${paramIndex}`)
        params.push(condition.value)
        paramIndex++
      } else if (condition.type === 'gte') {
        whereParts.push(`${condition.column} >= $${paramIndex}`)
        params.push(condition.value)
        paramIndex++
      }
    }

    return { sql: `WHERE ${whereParts.join(' AND ')}`, params }
  }

  private buildQuery(): { sql: string; params: any[] } {
    const { sql: whereClause, params } = this.buildWhereClause()
    
    let sql = `SELECT ${this.columns} FROM ${this.table}`
    if (whereClause) sql += ` ${whereClause}`
    
    if (this.orderBy) {
      sql += ` ORDER BY ${this.orderBy.column} ${this.orderBy.ascending ? 'ASC' : 'DESC'}`
    }
    
    if (this.limitCount) {
      sql += ` LIMIT ${this.limitCount}`
    }

    return { sql, params }
  }

  async execute(): Promise<{ data?: any; count?: number; error: any }> {
    try {
      if (this.isCount) {
        const { sql: whereClause, params } = this.buildWhereClause()
        const sql = `SELECT COUNT(*) as count FROM ${this.table}${whereClause ? ` ${whereClause}` : ''}`
        const result = await query(sql, params)
        return { count: parseInt(result.rows[0]?.count || '0'), error: null }
      }

      const { sql, params } = this.buildQuery()
      const result = await query(sql, params)
      return { data: result.rows, error: null }
    } catch (error: any) {
      if (this.isCount) {
        return { count: 0, error: { message: error.message } }
      }
      return { data: null, error: { message: error.message } }
    }
  }

  async single(): Promise<{ data: any; error: any }> {
    try {
      const { sql, params } = this.buildQuery()
      const result = await query(`${sql} LIMIT 1`, params)
      return { data: result.rows[0] || null, error: null }
    } catch (error: any) {
      return { data: null, error: { message: error.message } }
    }
  }
}

// This creates a Supabase-like interface for easy migration
export class LocalDBClient {
  from(table: string) {
    return {
      select: (columns: string = '*', options?: { count?: 'exact' | 'estimated' | 'planned', head?: boolean }) => {
        const builder = new QueryBuilder(table, columns, options)
        return builder
      },
      insert: (data: any) => ({
        select: (columns: string = '*') => ({
          single: async () => {
            try {
              const insertColumns = Object.keys(data).join(', ')
              const insertValues = Object.values(data)
              const placeholders = insertValues.map((_, i) => `$${i + 1}`).join(', ')
              const result = await query(
                `INSERT INTO ${table} (${insertColumns}) VALUES (${placeholders}) RETURNING ${columns}`,
                insertValues
              )
              return { data: result.rows[0] || null, error: null }
            } catch (error: any) {
              return { data: null, error: { message: error.message } }
            }
          },
          async execute() {
            try {
              const insertColumns = Object.keys(data).join(', ')
              const insertValues = Object.values(data)
              const placeholders = insertValues.map((_, i) => `$${i + 1}`).join(', ')
              const result = await query(
                `INSERT INTO ${table} (${insertColumns}) VALUES (${placeholders}) RETURNING ${columns}`,
                insertValues
              )
              return { data: result.rows, error: null }
            } catch (error: any) {
              return { data: null, error: { message: error.message } }
            }
          }
        }),
        async execute() {
          try {
            const columns = Object.keys(data).join(', ')
            const values = Object.values(data)
            const placeholders = values.map((_, i) => `$${i + 1}`).join(', ')
            const result = await query(
              `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
              values
            )
            return { data: result.rows[0], error: null }
          } catch (error: any) {
            return { data: null, error: { message: error.message } }
          }
        }
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          async execute() {
            try {
              const columns = Object.keys(data)
              const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(', ')
              const values = [...Object.values(data), value]
              const result = await query(
                `UPDATE ${table} SET ${setClause} WHERE ${column} = $${values.length} RETURNING *`,
                values
              )
              return { data: result.rows[0] || null, error: null }
            } catch (error: any) {
              return { data: null, error: { message: error.message } }
            }
          }
        }),
        async execute() {
          try {
            const columns = Object.keys(data)
            const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(', ')
            const values = Object.values(data)
            const result = await query(
              `UPDATE ${table} SET ${setClause} RETURNING *`,
              values
            )
            return { data: result.rows, error: null }
          } catch (error: any) {
            return { data: null, error: { message: error.message } }
          }
        }
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          async execute() {
            try {
              const result = await query(
                `DELETE FROM ${table} WHERE ${column} = $1 RETURNING *`,
                [value]
              )
              return { data: result.rows, error: null }
            } catch (error: any) {
              return { data: null, error: { message: error.message } }
            }
          }
        })
      })
    }
  }
}

export function createClient() {
  return new LocalDBClient()
}
