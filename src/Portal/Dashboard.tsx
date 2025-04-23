import { Clock, MapPin, MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateLikesInPost } from "./Account/client";


export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    enrolling,
    setEnrolling
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFacultyOrAdmin = currentUser?.role === 'FACULTY' || currentUser?.role === 'ADMIN';
    
    // Get current user ID from localStorage
    const [currentUserId, setCurrentUserId] = useState("");
    
    // Track what's being composed in the post form
    const [isComposing, setIsComposing] = useState(false);
    
    // Modified courses with user info
    const [enhancedCourses, setEnhancedCourses] = useState<any[]>([]);

    useEffect(() => {
        // Get current user ID from localStorage
        const userId = localStorage.getItem('userId');
        setCurrentUserId(userId || "");
        
        // If course doesn't have a creatorId, add it
        if (course && !course.creatorId && userId) {
            setCourse({ ...course, creatorId: userId });
        }
        
        // Enhance courses with formatted timestamps
        const enhanced = courses.map(course => {
            const timestamp = course.timestamp || new Date().toISOString();
            const date = new Date(timestamp);
            const now = new Date();
            
            // Calculate time difference
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);
            
            let formattedTime;
            if (diffMins < 1) {
                formattedTime = 'Just now';
            } else if (diffMins < 60) {
                formattedTime = `${diffMins}m ago`;
            } else if (diffHours < 24) {
                formattedTime = `${diffHours}h ago`;
            } else {
                formattedTime = `${diffDays}d ago`;
            }
            
            return {
                ...course,
                formattedTime
            };
        });
        
        setEnhancedCourses(enhanced);
    }, [courses, course, setCourse]);
    
    const handleCreatePost = () => {
        // Make sure the current user ID is associated with the post
        if (currentUserId && !course.creatorId) {
            const updatedCourse = { 
                ...course, 
                creatorId: currentUserId,
                timestamp: new Date().toISOString()
            };
            setCourse(updatedCourse);
            addNewCourse();
        } else {
            addNewCourse();
        }
    };
    
    const navigateToProfile = (userId: string) => {
        if (userId) {
            navigate(`/portal/profile/${userId}`);
        }
    };

    return (
        <div className="container py-4" style={{ maxWidth: "800px", margin: "140px auto" }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="mb-0 fw-bold" style={{ color: "#0a66c2" }}>My Network Feed</h4>
                {!isFacultyOrAdmin && (
                    <button 
                        onClick={() => setEnrolling(!enrolling)} 
                        className="btn" 
                        style={{ 
                            backgroundColor: "#0a66c2", 
                            color: "white",
                            borderRadius: "24px",
                            padding: "6px 16px",
                            fontWeight: "600",
                            fontSize: "14px"
                        }}
                    >
                        {enrolling ? "All Posts" : "My Posts"}
                    </button>
                )}
            </div>

            {/* Post Creation Card */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                        <div 
                            style={{ 
                                width: "48px", 
                                height: "48px", 
                                borderRadius: "50%", 
                                backgroundColor: "#0a66c2", 
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                                marginRight: "12px"
                            }}
                        >
                            {currentUser?.firstName?.charAt(0) || "U"}
                        </div>
                        
                        <div 
                            onClick={() => setIsComposing(true)}
                            style={{ 
                                flex: 1, 
                                padding: "12px 16px", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "24px", 
                                cursor: "pointer" 
                            }}
                        >
                            <span className="text-muted">Start a post...</span>
                        </div>
                    </div>
                    
                    {isComposing && (
                        <div className="mt-3">
                            <input
                                value={course.name}
                                className="form-control mb-3"
                                placeholder="Job Title"
                                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                                style={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    fontSize: "16px",
                                }}
                            />
                            
                            <textarea
                                value={course.description}
                                className="form-control mb-3"
                                placeholder="Job Description"
                                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                                style={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    fontSize: "16px",
                                    minHeight: "120px",
                                }}
                            />
                            
                            <div className="d-flex justify-content-between">
                                <button 
                                    className="btn" 
                                    style={{ color: "#666" }}
                                    onClick={() => {
                                        setIsComposing(false);
                                        setCourse({ name: "", description: "" });
                                    }}
                                >
                                    Cancel
                                </button>
                                
                                <div>
                                    {course._id && (
                                        <button
                                            className="btn me-2"
                                            onClick={updateCourse}
                                            style={{
                                                backgroundColor: "#f5f5f5",
                                                color: "#0a66c2",
                                                border: "1px solid #0a66c2",
                                                borderRadius: "24px",
                                                padding: "6px 16px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            Update
                                        </button>
                                    )}
                                    
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            handleCreatePost();
                                            setIsComposing(false);
                                        }}
                                        disabled={!course.name || !course.description}
                                        style={{
                                            backgroundColor: course.name && course.description ? "#0a66c2" : "#e0e0e0",
                                            color: course.name && course.description ? "white" : "#666",
                                            borderRadius: "24px",
                                            padding: "6px 16px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Posts Feed */}
            <div className="posts-feed">
                {enhancedCourses.map((course: any) => (
                    <div className="card shadow-sm mb-3" key={course._id}>
                        <div className="card-body">
                            {/* Post Header with User Info */}
                            <div className="d-flex mb-3">
                                <div 
                                    onClick={() => navigateToProfile(course.creatorId || "")}
                                    style={{ 
                                        width: "48px", 
                                        height: "48px", 
                                        borderRadius: "50%", 
                                        backgroundColor: "#0a66c2", 
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        marginRight: "12px",
                                        cursor: "pointer"
                                    }}
                                >
                                    {course.creatorFirstName?.charAt(0) || "U"}
                                </div>
                                
                                <div>
                                    <div 
                                        className="fw-bold" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigateToProfile(course.creatorId || "")}
                                    >
                                        {course.creatorName || "You"}
                                    </div>
                                    
                                    <div className="text-muted small d-flex align-items-center">
                                        <span>{course.creatorTitle || "Professional"}</span>
                                        <span className="mx-1">•</span>
                                        <span className="d-flex align-items-center">
                                            <Clock size={12} className="me-1" />
                                            {course.formattedTime}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Admin Actions */}
                                {(isFacultyOrAdmin || currentUserId === course.creatorId) && (
                                    <div className="ms-auto dropdown">
                                        <button 
                                            className="btn btn-sm" 
                                            type="button" 
                                            data-bs-toggle="dropdown"
                                            style={{ color: "#666" }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                            </svg>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setCourse(course);
                                                        setIsComposing(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={() => deleteCourse(course._id)}
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            
                            {/* Post Content */}
                            <div>
                                <h5 className="card-title" style={{ fontWeight: "600", color: "#333" }}>
                                    {course.name}
                                </h5>
                                
                                <p className="card-text" style={{ color: "#444", whiteSpace: "pre-line" }}>
                                    {course.description}
                                </p>
                            </div>
                            
                            {/* Job Location and Details if available */}
                            {(course.location || course.salary) && (
                                <div className="d-flex flex-wrap mb-3 mt-2">
                                    {course.location && (
                                        <div className="me-3 d-flex align-items-center text-muted small">
                                            <MapPin size={14} className="me-1" />
                                            {course.location}
                                        </div>
                                    )}
                                    
                                    {course.salary && (
                                        <div className="d-flex align-items-center text-muted small">
                                            <span className="me-1">💰</span>
                                            {course.salary}
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {/* Skills Tags if available */}
                            {course.skills && course.skills.length > 0 && (
                                <div className="d-flex flex-wrap mb-3 gap-2">
                                    {course.skills.map((skill: string, idx: number) => (
                                        <span 
                                            key={idx}
                                            style={{
                                                backgroundColor: "#f0f7ff",
                                                color: "#0a66c2",
                                                borderRadius: "16px",
                                                padding: "4px 12px",
                                                fontSize: "13px"
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                            
                            {/* Engagement Metrics */}
                            <div className="d-flex justify-content-between align-items-center border-top border-bottom py-2 my-3">
                                <div className="text-muted small d-flex align-items-center">
                                    <ThumbsUp size={14} className="me-1" style={{ color: "#0a66c2" }} />
                                    <span>{course.likes || 0}</span>
                                </div>
                                
                                <div className="text-muted small">
                                    {course.comments ? `${course.comments} comments` : ''}
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="d-flex justify-content-between">
                                <button 
                                    className="btn btn-light flex-grow-1 d-flex align-items-center justify-content-center"
                                    onClick={async () => {
                                        const updatedLikes = (course.likes || 0) + 1;
                                        // Update local state
                                        const updatedCourse = { ...course, likes: updatedLikes };
                                        setEnhancedCourses(enhancedCourses.map(c => 
                                            c._id === course._id ? updatedCourse : c
                                        ));
                                        // Update backend
                                        await updateLikesInPost(updatedLikes, course._id);
                                    }}
                                    style={{ borderRadius: "4px" }}
                                >
                                    <ThumbsUp size={18} className="me-2" />
                                    Like
                                </button>
                                
                                <Link
                                    to={`/Portal/Courses/${course._id}/Apply`}
                                    className="btn btn-light flex-grow-1 d-flex align-items-center justify-content-center"
                                    style={{ borderRadius: "4px" }}
                                >
                                    <MessageSquare size={18} className="me-2" />
                                    Comment
                                </Link>
                                
                                <button 
                                    className="btn btn-light flex-grow-1 d-flex align-items-center justify-content-center"
                                    style={{ borderRadius: "4px" }}
                                >
                                    <Share2 size={18} className="me-2" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {enhancedCourses.length === 0 && (
                    <div className="text-center p-5 bg-light rounded">
                        <p className="mb-0 text-muted">No posts yet. Be the first to share something!</p>
                    </div>
                )}
            </div>
        </div>
    );
}