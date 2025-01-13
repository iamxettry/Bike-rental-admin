import React from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";

function CustomerSupport() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Support
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-blue-50 rounded-lg">
          <Mail className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">
            Get help via email within 24 hours
          </p>
          <a
            href="mailto:withmybike@gmail.com"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            withmybike@gmail.com
          </a>
        </div>

        <div className="p-6 bg-green-50 rounded-lg">
          <Phone className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">Available Mon-Fri, 9AM-5PM EST</p>
          <a
            href="tel:1-800-123-4567"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            9812997800
          </a>
        </div>

        {/* <div className="p-6 bg-purple-50 rounded-lg">
          <MessageSquare className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Instant support from our team</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Start Chat
          </button>
        </div> */}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            Monday - Friday: 9:00 AM - 5:00 PM EST
          </p>
          <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM EST</p>
          <p className="text-gray-600">Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerSupport;
