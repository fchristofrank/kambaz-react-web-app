import { useEffect, useState } from "react";
import { BiBookmark, BiLike } from "react-icons/bi";
import { FaPen, FaReply, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { addModule, deleteModule, editModule, setModules, updateModule } from "./reducer";

export default function Comments() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  // Track likes in localStorage
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  // Load likes and bookmarks from localStorage on initial render
  useEffect(() => {
    const storedLikes = localStorage.getItem('comment-likes');
    const storedBookmarks = localStorage.getItem('comment-bookmarks');
    
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
    
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  // Handle liking a comment
  const handleLike = (moduleId: string) => {
    const newLikes = { ...likes, [moduleId]: !likes[moduleId] };
    setLikes(newLikes);
    localStorage.setItem('comment-likes', JSON.stringify(newLikes));
  };

  // Handle bookmarking a comment
  const handleBookmark = (moduleId: string) => {
    const newBookmarks = { ...bookmarks, [moduleId]: !bookmarks[moduleId] };
    setBookmarks(newBookmarks);
    localStorage.setItem('comment-bookmarks', JSON.stringify(newBookmarks));
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "Just now";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { 
      name: moduleName, 
      course: cid,
      createdAt: new Date().toISOString()
    };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
    setModuleName(""); // Clear the input field after posting
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div style={{ 
      maxWidth: "100%", 
      backgroundColor: "#f9fafb", 
      borderRadius: "8px",
      padding: "24px"
    }}>
      <h2 style={{ 
        fontSize: "20px", 
        fontWeight: "600", 
        marginBottom: "24px",
        color: "#333"
      }}>
        Discussion ({modules.length})
      </h2>
      
      {/* Comment Input Section */}
      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "8px",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.08)",
        padding: "20px",
        marginBottom: "24px"
      }}>
        <div style={{ marginBottom: "16px" }}>
          <textarea
            placeholder="Share your thoughts or ask a question..."
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
              fontSize: "14px",
              outline: "none",
              resize: "vertical"
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={createModuleForCourse}
            disabled={!moduleName.trim()}
            style={{
              backgroundColor: moduleName.trim() ? "#0a66c2" : "#e0e0e0",
              color: "white",
              border: "none",
              borderRadius: "16px",
              padding: "8px 16px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: moduleName.trim() ? "pointer" : "not-allowed",
              transition: "background-color 0.2s"
            }}
          >
            Post
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {modules.length === 0 ? (
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.08)",
            padding: "40px 20px",
            textAlign: "center"
          }}>
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px" }}>
              No comments yet. Be the first to start the conversation!
            </p>
          </div>
        ) : (
          modules.map((module: any) => (
            <div 
              key={module._id} 
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.08)",
                transition: "box-shadow 0.2s",
                overflow: "hidden"
              }}
            >
              <div style={{ padding: "16px 20px" }}>
                {/* Comment Header */}
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  marginBottom: "12px"
                }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ 
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#0a66c2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginRight: "12px"
                    }}>
                      {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div style={{ 
                        fontWeight: "600", 
                        fontSize: "14px", 
                        color: "#333" 
                      }}>
                        {currentUser?.name || "Anonymous User"}
                      </div>
                      <div style={{ 
                        color: "#666", 
                        fontSize: "12px" 
                      }}>
                        {formatDate(module.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: "8px" }}>
                    {/* Edit Button */}
                    <button
                      onClick={() => dispatch(editModule(module._id))}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#666",
                        fontSize: "14px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <FaPen size={12} />
                      {module.editing ? "Save" : "Edit"}
                    </button>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => removeModule(module._id)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#666",
                        fontSize: "14px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <FaTrash size={12} />
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Comment Content */}
                <div style={{ marginBottom: "16px" }}>
                  {!module.editing ? (
                    <p style={{ 
                      fontSize: "14px", 
                      color: "#333",
                      lineHeight: "1.5",
                      whiteSpace: "pre-wrap"
                    }}>
                      {module.name}
                    </p>
                  ) : (
                    <textarea
                      value={module.name}
                      onChange={(e) => 
                        dispatch(updateModule({ ...module, name: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.ctrlKey) {
                          saveModule({ ...module, editing: false });
                        }
                      }}
                      style={{
                        width: "100%",
                        minHeight: "100px",
                        padding: "12px",
                        borderRadius: "4px",
                        border: "1px solid #0a66c2",
                        fontSize: "14px",
                        outline: "none",
                        resize: "vertical"
                      }}
                    />
                  )}
                  
                  {module.editing && (
                    <div style={{ 
                      textAlign: "right", 
                      marginTop: "8px", 
                      fontSize: "12px", 
                      color: "#666" 
                    }}>
                      Press Ctrl+Enter to save
                    </div>
                  )}
                </div>
                
                {/* Comment Actions */}
                <div style={{ 
                  display: "flex", 
                  borderTop: "1px solid #f0f0f0",
                  paddingTop: "12px"
                }}>
                  <button
                    onClick={() => handleLike(module._id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: likes[module._id] ? "#0a66c2" : "#666",
                      fontWeight: likes[module._id] ? "600" : "normal",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "16px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    <BiLike style={{ marginRight: "4px" }} /> Like
                  </button>
                  
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#666",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "16px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    <FaReply style={{ marginRight: "4px" }} /> Reply
                  </button>
                  
                  <button
                    onClick={() => handleBookmark(module._id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: bookmarks[module._id] ? "#0a66c2" : "#666",
                      fontWeight: bookmarks[module._id] ? "600" : "normal",
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    <BiBookmark style={{ marginRight: "4px" }} /> 
                    {bookmarks[module._id] ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
              
              {/* Replies Section - if module has lessons */}
              {module.lessons && module.lessons.length > 0 && (
                <div style={{ 
                  borderTop: "1px solid #f0f0f0", 
                  padding: "12px 20px", 
                  backgroundColor: "#f9fafb" 
                }}>
                  <h5 style={{ 
                    fontSize: "14px", 
                    fontWeight: "600", 
                    marginBottom: "12px", 
                    color: "#666" 
                  }}>
                    Replies ({module.lessons.length})
                  </h5>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {module.lessons.map((lesson: any) => (
                      <div 
                        key={lesson._id} 
                        style={{
                          display: "flex",
                          paddingLeft: "20px",
                          borderLeft: "2px solid #e0e0e0"
                        }}
                      >
                        <div style={{ 
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: "#666",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "12px",
                          marginRight: "12px"
                        }}>
                          U
                        </div>
                        <div>
                          <div style={{ fontWeight: "600", fontSize: "13px", color: "#333" }}>
                            User
                          </div>
                          <p style={{ fontSize: "13px", margin: "4px 0 0 0", color: "#333" }}>
                            {lesson.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}