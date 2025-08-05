import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Support = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 ">
     
      <div className="max-w-3xl mx-auto text-center mb-14 mt-30">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Need Help? We're Here for You.
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Our team is ready to support your creative journey on Designer Hut. Reach out anytime!
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-12">
        
      

     
        <div className="space-y-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-indigo-600">How do I upload my designs?</h4>
              <p className="text-gray-700">
                Go to the Upload page from your dashboard, select your files, fill in details, and hit "Submit". Your work will be live shortly after review.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-indigo-600">Is Designer Hut free to use?</h4>
              <p className="text-gray-700">
                Yes, creating a profile and uploading your designs is completely free. We offer premium features for enhanced visibility.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-indigo-600">How can I get freelance opportunities?</h4>
              <p className="text-gray-700">
                Ensure your profile is complete and your portfolio is high-quality. Clients can reach out to you directly through your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
