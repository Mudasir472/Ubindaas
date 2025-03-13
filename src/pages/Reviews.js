import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReviewBlock from "./ReviewBlock";

function Reviews({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewData, setReviewData] = useState({ rating: 5, review: '' });
    const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
    const navigate = useNavigate();
    const [newReview, setNewReview] = useState({});
    const [showAll, setShowAll] = useState(false);

    const handleToggle = () => {
        setShowAll((prevShowAll) => !prevShowAll);
    };

    const token = localStorage.getItem("authToken");

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/api/ratings/${id}`, reviewData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setNewReview(res?.data?.newReview);
            setReviewData({ rating: 5, comment: '' });
            toast.success("Review Success");
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error?.response?.data?.error || "Error here");
            console.log(error);

            setIsModalOpen(false);
        }
    };

    // useEffect(() => {
    //     const counts = [0, 0, 0, 0, 0];
    //     newReview?.forEach((review) => {
    //         counts[review.rating - 1] += 1;
    //     });
    //     const total = newReview?.length || 1;
    //     const percentages = counts.map((count) => (count / total) * 100);
    //     setRatings(percentages);
    // }, [newReview]);

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/ratings/getAllRatings`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

            } catch (error) {
                console.log(error);

            }
        }
        fetchAllReviews()
    }, [])

    return (
        <div className="container my-4">
            <div className="card p-4 bg-light">
                <div className="d-flex justify-content-between">
                    <div className="card p-3 text-center w-25">
                        <p className="fw-bold fs-5">
                            {(ratings.reduce((sum, rating, index) => sum + (rating / 100) * (index + 1), 0)).toFixed(1)} out of 5
                        </p>
                        <p>Top Rating</p>
                    </div>
                    
                </div>
                
                <button className="btn btn-warning w-25 mt-3" onClick={() => setIsModalOpen(true)}>
                    Write a Review
                </button>
            </div>
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <div className="modal-header">
                                <h5 className="modal-title">Add a Review</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <form onSubmit={submitReview}>
                                <div className="modal-body">
                                    <fieldset className="d-flex justify-content-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <div key={star} className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id={`rate-${star}`}
                                                    name="rating"
                                                    value={star}
                                                    checked={reviewData.rating === String(star)}
                                                    onChange={handleReviewChange}
                                                />
                                                <label className="form-check-label" htmlFor={`rate-${star}`}>
                                                    {star} ★
                                                </label>
                                            </div>
                                        ))}
                                    </fieldset>
                                    <div className="form-group mt-3">
                                        <label htmlFor="comment">Comment</label>
                                        <textarea
                                            className="form-control"
                                            id="review"
                                            name="review"
                                            rows="4"
                                            value={reviewData.review}
                                            onChange={handleReviewChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-warning w-100">Submit Review</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reviews;
