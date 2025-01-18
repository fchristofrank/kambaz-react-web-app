export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            {/* Assignment Name */}
            <h4>Assignment Name</h4>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />

            {/* Description */}
            <textarea id="wd-description" rows={5} cols={60}>
                The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
                Your full name and section
                Links to each of the lab assignments
                Link to the Kanbas application
                Links to all relevant source code repositories
                The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
            <br />
            <br />

            <table>
                {/* Points */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />

                {/* Assignment Group */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option>ASSIGNMENTS</option>
                            <option>PROJECTS</option>
                            <option>QUIZZES</option>
                        </select>
                    </td>
                </tr>
                <br />

                {/* Display Grade As */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option>Percentage</option>
                            <option>Points</option>
                            <option>Complete/Incomplete</option>
                        </select>
                    </td>
                </tr>
                <br />

                {/* Submission Type */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    
                    <td>
                        <select id="wd-submission-type">
                            <option>Online</option>
                            <option>On Paper</option>
                            <option>No Submission</option>
                        </select>
                        <br />
                        <br />
                        <div>
                            <input type="checkbox" id="wd-text-entry" />
                            <label htmlFor="wd-text-entry">Text Entry</label><br />
                            <input type="checkbox" id="wd-website-url" />
                            <label htmlFor="wd-website-url">Website URL</label><br />
                            <input type="checkbox" id="wd-media-recordings" />
                            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                            <input type="checkbox" id="wd-student-annotation" />
                            <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                            <input type="checkbox" id="wd-file-upload" />
                            <label htmlFor="wd-file-upload">File Uploads</label>
                        </div>
                    </td>
                </tr>
                <br />

                {/* Assign To */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign To</label>
                    </td>
                    <td>
                        <input id="wd-assign-to" value="Everyone" />
                    </td>
                </tr>
                <br />

                {/* Due Date */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due-date">Due</label>
                    </td>
                    <td>
                        <input type="date" id="wd-due-date" value="2024-05-13" />
                    </td>
                </tr>
                <br />

                <tr>
                    <td colSpan={2} style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-block' }}>
                            <div style={{ display: 'inline-block', marginRight: '10px', textAlign: 'left' }}>
                                <label htmlFor="wd-available-from">Available from</label><br />
                                <input type="date" id="wd-available-from" value="2024-05-06" />
                            </div>
                            <div style={{ display: 'inline-block', textAlign: 'left' }}>
                                <label htmlFor="wd-until">Until</label><br />
                                <input type="date" id="wd-until" value="2024-05-20" />
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <br />
            <hr />
            <div style={{ textAlign: 'right' }}>
                <button style={{ marginRight: '10px' }}>Cancel</button>
                <button>Save</button>
            </div>
        </div >
    );
}
