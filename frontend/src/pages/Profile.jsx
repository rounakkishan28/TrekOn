"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { FaComments, FaHeart, FaStar, FaCalendarCheck, FaPlusSquare } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { ChartTooltipContent, ChartContainer, ChartTooltip } from "../components/ui/chart.jsx";
import { toast } from "../hooks/use-toast.js";
import { images } from "../assets/index.js";
import UpdateProfile from "../components/custom/UpdateProfile.jsx";

const chartConfig = {
  hosted: { label: "Hosted Deals", color: '#393939' },
  bookings: { label: "Bookings", color: "#393939" },
  reviews: { label: "reviews", color: "#919191" }
}

function Profile({ url }) {
  
  const navigate = useNavigate();
  const [showUpdatePic, setShowUpdatePic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(0);
  const [wishlist, setWishlist] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [hosted, setHosted] = useState(0);
  const [monthly, setMonthly] = useState(null);

  const logout = () => {
    localStorage.removeItem('trekon');
    navigate('/');
  };

  async function loadDashboard(token) {
    try {
      const response = await axios.get(`${url}/api/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(response.data.user);
        setBookings(response.data.bookings);
        setWishlist(response.data.wishlist);
        setReviews(response.data.reviews);
        setHosted(response.data.hosted);
        setMonthly(response.data.monthly);
        setLoading(false);
      } else toast({ title: 'Failed.' });
    } catch (error) {
      toast({ title: 'Error.' });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('trekon');
    loadDashboard(token);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <RotatingLines height="80" width="80" strokeColor="#393939" strokeWidth="4" />
        </div>
      ) : (
        <div>
          {showUpdatePic && <UpdateProfile url={url} setShowUpdatePic={setShowUpdatePic} />}
          <div className="p-4 sm:p-6 min-h-screen bg-gray-800 text-gray-100">

            {/* User Profile Section */}
            <div className="flex flex-col sm:flex-row max-w-6xl mx-auto items-center bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <img
                src={user.photo ? `${url}/images/` + user.photo : images.profile}
                alt="dp"
                className="w-32 h-32 rounded-full shadow-lg mb-4 sm:mb-0"
              />
              <img onClick={() => setShowUpdatePic(true)} src={images.pencil} alt="edit" className="w-5 h-5 cursor-pointer rounded-t-full sm:mt-28" />
              <div className="text-center sm:text-left sm:ml-6">
                <p className="text-2xl font-semibold text-gray-200">
                  {user.firstname} {user.lastname}
                </p>
                <p className="text-gray-400 text-lg">@{user.username}</p>
              </div>
            </div>

            {/* Dashboard Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                Dashboard
              </h2>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-6xl mx-auto">
              <Link to="/bookings">
                <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Total Bookings</CardDescription>
                      <FaCalendarCheck className="text-3xl text-gray-400" />
                    </div>
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{bookings}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              <Link to="/reviews">
                <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Total Reviews</CardDescription>
                      <FaStar className="text-3xl text-gray-400" />
                    </div>
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{reviews}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              <Link to="/wishlist">
                <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Wishlist Items</CardDescription>
                      <FaHeart className="text-3xl text-gray-400" />
                    </div>
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{wishlist}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              <Link to="/hosted-deals">
                <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Hosted Deals</CardDescription>
                      <FaCalendarCheck className="text-3xl text-gray-400" />
                    </div>
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-white">{hosted}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
              <Link to="/messages">
                <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Messages</CardDescription>
                      <FaComments className="text-3xl text-gray-400" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
              <Link to="/host">
                <Card className="w-full bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-lg hover:shadow-md hover:shadow-white transform transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Host Deal</CardDescription>
                      <FaPlusSquare className="text-3xl text-gray-400" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </div>

            {/* Chart Section */}
            <div className="mt-16 mx-auto max-w-6xl p-6 sm:p-8 bg-gray-800 rounded-lg shadow-md shadow-white">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                  Monthly Engagement
                </h2>
              </div>
              <ChartContainer config={chartConfig} className="h-80 min-h-[200px] w-full">
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    stroke="#CBD5E1"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hosted" fill="#b0b0b0" radius={2} />
                  <Bar dataKey="bookings" fill="#808080" radius={2} />
                  <Bar dataKey="reviews" fill="#6d6d6d" radius={2} />
                </BarChart>
              </ChartContainer>
            </div>

            {/* Logout Section */}
            <div onClick={logout} className="flex justify-center my-8">
              <Card className="w-fit px-3 cursor-pointer bg-gradient-to-br from-gray-700 to-gray-800 border-0 rounded-full shadow-lg hover:shadow-2xl transform transition-all">
                <CardHeader>
                  <div className="flex justify-between items-center gap-8">
                    <CardDescription className="text-lg sm:text-xl text-gray-100 font-medium">Logout</CardDescription>
                    <IoIosLogOut className="text-3xl text-gray-400" />
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default Profile;
