import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0)

  const faqs = [
    {
      question: 'Who can donate blood?',
      answer: 'Generally, healthy individuals aged 18-65 years, weighing at least 50kg, can donate blood. You should be in good health, not have donated blood in the last 3 months, and meet other medical criteria. Our platform will guide you through a health screening questionnaire before your first donation.'
    },
    {
      question: 'How often can I donate blood?',
      answer: 'You can donate whole blood every 3 months (12 weeks). This interval allows your body to fully replenish the donated blood. Platelet donations can be made more frequently, up to once every 2 weeks. Our system automatically tracks your donation history and will notify you when you\'re eligible to donate again.'
    },
    {
      question: 'Is blood donation safe?',
      answer: 'Yes, blood donation is completely safe when done at certified blood banks and hospitals. All equipment used is sterile and single-use. The donation process is supervised by trained medical professionals. You cannot contract any disease by donating blood, and the amount donated (usually 350-450ml) is easily replenished by your body.'
    },
    {
      question: 'How does Hemio verify donors?',
      answer: 'We have a comprehensive verification process that includes email verification, phone number confirmation, and identity verification through government-issued IDs. Additionally, all donors must complete a health screening questionnaire and undergo medical screening at the donation center before their first donation.'
    },
    {
      question: 'What happens after I register as a donor?',
      answer: 'After registration, you\'ll complete your profile with health information and availability preferences. When someone needs your blood type in your area, you\'ll receive notifications. You can choose to respond to requests that fit your schedule. Once you agree to donate, we\'ll connect you with the recipient or hospital to coordinate the donation.'
    },
    {
      question: 'Can I request blood for someone else?',
      answer: 'Yes, you can create blood requests for family members, friends, or patients. You\'ll need to provide the patient\'s details, hospital information, and medical requirements. The request will be visible to compatible donors in your area, and you\'ll be notified when donors respond.'
    },
    {
      question: 'How quickly can I find a donor?',
      answer: 'Response times vary based on blood type rarity and location. Common blood types (O+, A+) typically get responses within a few hours, while rare types may take longer. In emergency situations, we prioritize urgent requests and send immediate notifications to all compatible donors in the area.'
    },
    {
      question: 'Is there any cost involved?',
      answer: 'Hemio is completely free for both donors and recipients. We don\'t charge any fees for connecting donors with those in need. However, some hospitals or blood banks may have their own processing fees for blood collection and testing, which is separate from our platform.'
    },
    {
      question: 'What if I need to cancel a donation commitment?',
      answer: 'We understand that emergencies happen. If you need to cancel, please notify us as soon as possible through the app or by calling our support line. This allows us to quickly find alternative donors. Frequent cancellations may affect your donor rating, so please only commit when you\'re certain you can donate.'
    },
    {
      question: 'How do I know my donation made a difference?',
      answer: 'After your donation, you\'ll receive updates about how your blood was used (while maintaining recipient privacy). You can track your donation history, see the number of lives you\'ve impacted, and receive thank-you messages from recipients when they choose to share their gratitude.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index)
  }

  return (
    <section className="section-padding-lg bg-red-50">
      <div className="container-base px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 border-3 bg-white rounded-full mb-6">
            <HelpCircle className="w-14 h-14 text-white fill-red-500" />
          </div>
          <h2 className="text-heading-2 mb-4">
            Frequently Asked <span className='text-red-500'>Questions</span>
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            Get answers to common questions about blood donation, our platform, and how you can help save lives.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-red-500 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-muted" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted" />
                    )}
                  </div>
                </button>
                
                {openFAQ === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <p className="text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Still have questions? */}
        <div className="text-center mt-16">
          <div className="bg-section-accent rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-primary mb-4">
              Still Have <span className='text-red-500'>Questions?</span>
            </h3>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Our support team is here to help you with any questions about blood donation, 
              our platform, or how to get started as a donor or recipient.
            </p>
              <button onClick={() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });}} 
                      className="btn-primary px-8 py-3 text-lg">
                
                 Contact Us
              </button>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ