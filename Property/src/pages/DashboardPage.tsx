import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Heart,
  Search,
  Calendar,
  Home,
  Eye,
  MessageCircle,
} from "lucide-react";
import FavoriteManager from "../components/FavoriteManager";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    savedProperties: 12,
    savedSearches: 3,
    scheduledViewings: 2,
    recentViews: 8,
  };

  const recentActivity = [
    {
      id: 1,
      type: "favorite",
      property: "Modern Luxury Home",
      time: "2 hours ago",
    },
    { id: 2, type: "view", property: "Charming Victorian", time: "1 day ago" },
    { id: 3, type: "search", query: "Houses in Berkeley", time: "2 days ago" },
    { id: 4, type: "message", agent: "Sarah Johnson", time: "3 days ago" },
  ];

  const upcomingViewings = [
    {
      id: 1,
      property: "Modern Luxury Home with City Views",
      address: "1234 Hillside Drive, San Francisco",
      date: "2024-01-15",
      time: "2:00 PM",
      agent: "Sarah Johnson",
    },
    {
      id: 2,
      property: "Contemporary Condo with Bay Views",
      address: "890 Marina Boulevard, San Francisco",
      date: "2024-01-17",
      time: "10:00 AM",
      agent: "Lisa Rodriguez",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === "overview"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Home className="h-5 w-5 mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === "favorites"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Saved Properties
                </button>
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-blue-100">
                    You have {stats.savedProperties} saved properties and{" "}
                    {stats.scheduledViewings} upcoming viewings.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <Heart className="h-8 w-8 text-red-500" />
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.savedProperties}
                        </p>
                        <p className="text-gray-600">Saved Properties</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <Search className="h-8 w-8 text-blue-500" />
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.savedSearches}
                        </p>
                        <p className="text-gray-600">Saved Searches</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 text-green-500" />
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.scheduledViewings}
                        </p>
                        <p className="text-gray-600">Scheduled Viewings</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <Eye className="h-8 w-8 text-purple-500" />
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.recentViews}
                        </p>
                        <p className="text-gray-600">Recent Views</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center space-x-3"
                        >
                          <div className="flex-shrink-0">
                            {activity.type === "favorite" && (
                              <Heart className="h-5 w-5 text-red-500" />
                            )}
                            {activity.type === "view" && (
                              <Eye className="h-5 w-5 text-blue-500" />
                            )}
                            {activity.type === "search" && (
                              <Search className="h-5 w-5 text-green-500" />
                            )}
                            {activity.type === "message" && (
                              <MessageCircle className="h-5 w-5 text-purple-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">
                              {activity.type === "favorite" &&
                                `Saved ${activity.property}`}
                              {activity.type === "view" &&
                                `Viewed ${activity.property}`}
                              {activity.type === "search" &&
                                `Searched for ${activity.query}`}
                              {activity.type === "message" &&
                                `Message from ${activity.agent}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Upcoming Viewings
                    </h3>
                    <div className="space-y-4">
                      {upcomingViewings.map((viewing) => (
                        <div
                          key={viewing.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <h4 className="font-medium text-gray-900 mb-1">
                            {viewing.property}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {viewing.address}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              {viewing.date} at {viewing.time}
                            </span>
                            <span className="text-blue-600">
                              {viewing.agent}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <FavoriteManager />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
