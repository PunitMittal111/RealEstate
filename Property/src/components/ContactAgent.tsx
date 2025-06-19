import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const ContactAgent: React.FC = () => {
  const { selectedProperty } = useSelector(
    (state: RootState) => state.property
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `I'm interested in the property at ${selectedProperty?.address}. Please contact me to schedule a viewing.`,
    contactTime: "anytime",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: `I'm interested in the property at ${selectedProperty?.address}. Please contact me to schedule a viewing.`,
        contactTime: "anytime",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 mb-4">
          <svg
            className="mx-auto h-12 w-12\"
            fill="none\"
            viewBox="0 0 24 24\"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round\"
              strokeLinejoin="round\"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700">
          {selectedProperty?.owner?.name} will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Agent Info Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            alt={selectedProperty?.owner.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {selectedProperty?.owner.name}
            </h3>
            <p className="text-gray-600">{selectedProperty?.owner.email}</p>
            <p className="text-gray-600">{selectedProperty?.owner.phone}</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`tel:${selectedProperty?.owner.phone}`}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </a>
          <a
            href={`mailto:${selectedProperty?.owner.email}`}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </a>
          <button className="flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
            <MessageCircle className="h-4 w-4 mr-2" />
            Text
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Send a Message
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="inline h-4 w-4 mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Phone className="inline h-4 w-4 mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(+91)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="inline h-4 w-4 mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="inline h-4 w-4 mr-1" />
              Best Time to Contact
            </label>
            <select
              name="contactTime"
              value={formData.contactTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="anytime">Anytime</option>
              <option value="morning">Morning (8AM-12PM)</option>
              <option value="afternoon">Afternoon (12PM-5PM)</option>
              <option value="evening">Evening (5PM-8PM)</option>
              <option value="weekend">Weekends Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MessageCircle className="inline h-4 w-4 mr-1" />
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell us about your needs..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md font-semibold transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
            } text-white`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              <>
                <Calendar className="inline h-4 w-4 mr-2" />
                Send Message & Request Showing
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By submitting, you agree to receive calls and texts about this
          property. Message/data rates may apply.
        </p>
      </form>
    </div>
  );
};

export default ContactAgent;
