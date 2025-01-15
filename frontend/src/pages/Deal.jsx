import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { Button } from '../components/ui/button.jsx';
import { toast } from '../hooks/use-toast.js';
import { Textarea } from '../components/ui/textarea.jsx';

function Deal({ url }) {
  
  const navigate = useNavigate();
  const token = localStorage.getItem('trekon');
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState(false);
  const [hosted, setHosted] = useState({});
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch deal details
  async function loadDeal() {
    try {
      const response = await axios.get(`${url}/api/deal/deal/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setDeal(response.data.deal);
        setReviews(response.data.reviews || []);
        setWishlist(response.data.wishlist);
        setHosted(response.data.hosted);
      } else {
        toast({ title: response.data.message });
      }
    } catch (error) {
      toast({ title: 'Failed to fetch deal details.', description: error?.message || 'An unknown error occurred.' });
    } finally {
      setLoading(false);
    }
  }

  // Handle Booking
  const onBookHandler = async () => {
    try {
      const response = await axios.post(`${url}/api/booking/${id}/book`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        toast({ title: 'Deal booked successfully!' });
      } else {
        toast({ title: response.data.message });
      }
    } catch (error) {
      toast({ title: 'Failed to book the deal.', description: error.message });
    }
  };

  // Handle Review Submission
  const onSubmit = async () => {
    if (!comment || !rating || rating < 1 || rating > 5) {
      toast({ title: 'Please provide a valid rating and comment.' });
      return;
    }
    try {
      const response = await axios.post(`${url}/api/review/${id}/create`, { rating, comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        toast({ title: 'Review added successfully!' });
        setReviews(prev => [...prev, response.data.review]);
        setComment('');
        setRating('');
      } else {
        toast({ title: response.data.message });
      }
    } catch (error) {
      toast({ title: 'Failed to add review.', description: error.message });
    }
  };

  const toggleWishlist = async () => {
    try {
      const endpoint = wishlist ? `${url}/api/wishlist/${id}/remove` : `${url}/api/wishlist/${id}/add`;
      const response = await axios({
        method: wishlist ? 'DELETE' : 'POST',
        url: endpoint,
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) setWishlist(!wishlist);
    } catch (error) {
      toast({ title: 'Failed to update wishlist.' });
    }
  };

  useEffect(() => {
    loadDeal();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center mt-20'>
        <RotatingLines height='80' width='80' strokeColor='#393939' strokeWidth='4' />
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900'>
      <div className="max-w-4xl min-h-screen mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
        <img
          src={`${url}/images/${deal.image}`}
          alt={deal.name}
          className="w-full h-72 object-cover rounded-md mb-4"
        />
        <div className='flex justify-between'>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">{deal.name}</h1>
          <FaHeart onClick={toggleWishlist} color={wishlist ? '#2d3afa' : '#fff'} className='w-8 h-8 mt-2 mr-2' aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'} />
        </div>
        <p className="text-lg text-gray-100 mb-6">{deal.description}</p>
        <p className="text-gray-100 flex items-center gap-2">
          <FaMapMarkerAlt /> <span>{deal.cityName}, {deal.country}</span>
        </p>
        <p className="text-gray-100 text-sm mb-4 mt-2">Region: {deal.region}</p>
        <p className="text-2xl font-semibold text-blue-600 mb-4">₹ {deal.price}</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Activities</h2>
          <div className="flex flex-wrap gap-2">
            {deal.mountain && <span className="px-3 py-1 bg-blue-300 text-blue-800 rounded-full text-sm">Mountain Trekking</span>}
            {deal.aerial && <span className="px-3 py-1 bg-blue-300 text-blue-800 rounded-full text-sm">Aerial Activities</span>}
            {deal.beach && <span className="px-3 py-1 bg-blue-300 text-blue-800 rounded-full text-sm">Beach Activities</span>}
            {deal.nature && <span className="px-3 py-1 bg-blue-300 text-blue-800 rounded-full text-sm">Nature and Wildlife</span>}
            {deal.urban && <span className="px-3 py-1 bg-blue-300 text-blue-800 rounded-full text-sm">City and Urban Activities</span>}
            {deal.winter && <span className="px-3 py-1 bg-blue-300 text-blue-800 rounded-full text-sm">Winter Activities</span>}
            {deal.desert && <span className="px-3 py-1 bg-blue-300 text-blue-800 rounded-full text-sm">Desert Activities</span>}
          </div>
        </div>

        <div className='mb-4 flex gap-2'>
          <p className='text-base font-medium text-gray-100'>Hosted By:</p>
          <div onClick={() => navigate(`/profile/${hosted._id}`)} className='flex gap-1 text-base font-semibold text-gray-100 rounded-full bg-gray-900 w-fit pl-2 cursor-pointer'>
            <p>{' ' + hosted.username}</p>
            <img className='w-5 h-5 mt-0.5 rounded-full' src={`${url}/images/${hosted.photo}`} alt='dp' />
          </div>
        </div>

        {deal.trending && <p className="text-sm font-bold text-red-600">Trending Deal</p>}

        <Button
          onClick={onBookHandler}
          disabled={loading}
          className={`mt-4 ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-full py-2 px-6 transition duration-200`}>
          {loading ? 'Booking...' : 'Book Now'}
        </Button>

        {/* Reviews Section */}
        <div className="my-8">
          <h2 className="text-xl font-semibold text-gray-100">Reviews</h2>
          <div className="flex flex-col gap-5 mt-3">
            <div className="flex flex-col md:flex-row gap-5">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review"
                className="border-gray-500 text-gray-100 focus:ring-gray-500 rounded-md"
                rows={3}
              />
              <div className="w-full md:w-1/3">
                <select
                  className="p-3 text-gray-100 bg-gray-800 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform w-full"
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                >
                  <option value="" disabled>Give Rating</option>
                  <option value={1}>1-star</option>
                  <option value={2}>2-star</option>
                  <option value={3}>3-star</option>
                  <option value={4}>4-star</option>
                  <option value={5}>5-star</option>
                </select>
                <button
                  onClick={onSubmit}
                  className="w-full bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 hover:via-gray-800 text-white py-2 px-4 mt-2 rounded-sm transition-all duration-200"
                >
                  Add Review
                </button>
              </div>
            </div>
            {reviews.length === 0 && <div className='text-gray-400 text-lg'>No reviews yet</div>}
            {reviews.map((review) => (
              <div key={review._id} className="mt-4 border border-gray-500 rounded-md p-3">
                <div className='flex gap-2'>
                  <p className="text-xs text-gray-100 border border-gray-300 rounded-sm pl-1 pr-0.5">{review.rating} ★</p>
                  <p className="text-xs sm:text-sm text-gray-100 font-bold">{review.username}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
