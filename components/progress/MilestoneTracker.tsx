'use client'

import { useState } from 'react'
import { CheckCircle, Clock, Award, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface Milestone {
  id: string
  title: string
  description: string
  date?: Date
  completed: boolean
  category: 'permit' | 'integration' | 'citizenship' | 'financial'
}

interface MilestoneTrackerProps {
  milestones: Milestone[]
  onMilestoneComplete?: (id: string) => void
}

export default function MilestoneTracker({ milestones, onMilestoneComplete }: MilestoneTrackerProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(milestones.filter(m => m.completed).map(m => m.id))
  )

  const handleToggle = (id: string) => {
    const newCompleted = new Set(completedIds)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompletedIds(newCompleted)
    onMilestoneComplete?.(id)
  }

  const completedCount = completedIds.size
  const totalCount = milestones.length
  const progress = (completedCount / totalCount) * 100

  const categories = {
    permit: { label: 'Permits', color: 'blue', icon: Award },
    integration: { label: 'Integration', color: 'green', icon: TrendingUp },
    citizenship: { label: 'Citizenship', color: 'purple', icon: Award },
    financial: { label: 'Financial', color: 'yellow', icon: TrendingUp },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Immigration Milestones
          </h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {completedCount}/{totalCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 h-4 rounded-full"
          />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {Math.round(progress)}% complete
        </div>
      </div>

      {/* Milestones by Category */}
      <div className="space-y-6">
        {Object.entries(categories).map(([category, info]) => {
          const categoryMilestones = milestones.filter(m => m.category === category)
          if (categoryMilestones.length === 0) return null

          const Icon = info.icon
          const completedInCategory = categoryMilestones.filter(m => completedIds.has(m.id)).length
          const progressInCategory = (completedInCategory / categoryMilestones.length) * 100

          return (
            <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 text-${info.color}-600 dark:text-${info.color}-400`} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {info.label}
                  </h3>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {completedInCategory}/{categoryMilestones.length}
                </div>
              </div>

              <div className="space-y-2">
                {categoryMilestones.map((milestone) => {
                  const isCompleted = completedIds.has(milestone.id)
                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                        isCompleted
                          ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                      }`}
                      onClick={() => handleToggle(milestone.id)}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          isCompleted
                            ? 'text-green-900 dark:text-green-100 line-through'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {milestone.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {milestone.description}
                        </div>
                        {milestone.date && (
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Target: {milestone.date.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      {completedCount === totalCount && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white text-center"
        >
          <Award className="w-8 h-8 mx-auto mb-2" />
          <div className="font-bold text-lg">Congratulations!</div>
          <div className="text-sm opacity-90">All milestones completed!</div>
        </motion.div>
      )}
    </div>
  )
}

