export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Cookie Policy
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What Are Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience and allow us to understand how you use our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How We Use Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>To remember your preferences and settings</li>
              <li>To analyze how you use our website</li>
              <li>To improve our services and user experience</li>
              <li>To authenticate users and maintain sessions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Managing Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You can control and manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

