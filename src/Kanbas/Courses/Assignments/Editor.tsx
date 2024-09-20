export default function Editor() {
    return (
        <div>
            <div id="wd-assignments-editor">
                <label htmlFor="wd-name"><b>Assignment Name</b></label><br /><br />
                <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
                <textarea id="wd-description" cols={50} rows={5}>
                    The assignment is available online.

                    Links to an external site.

                    Submit a link to the landing page of your Web application running on Netlify.

                    The landing page should include the following:

                    Your full name and section
                    Links to each of the lab assignments
                    Link to the Kanbas application
                    Links to all relevant source code repositories
                    The Kanbas application should include a link to navigate back to the landing page.
                </textarea>
                <br />
                <table>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" value={100} />
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td>
                            <select>
                                <option value="VAL1" selected>Assignments</option>
                            </select>
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-display-grade-as">Display Grade as</label>
                        </td>
                        <td>
                            <select>
                                <option value="VAL1" selected>Percentage</option>
                            </select>
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-submission-type">Submission Type</label>
                        </td>
                        <td>
                            <select>
                                <option value="VAL1" selected>Online</option>
                            </select>
                            <br />
                            <br />
                            <span>Online Entry Options</span>
                            <br />
                            <input id="wd-text-entry" type="checkbox" />
                            <label htmlFor="wd-text-entry">Text Entry</label><br />
                            <input id="wd-website-url" type="checkbox" />
                            <label htmlFor="wd-website-url">Website URL</label><br />
                            <input id="wd-media-recordings" type="checkbox" />
                            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                            <input id="wd-student-annotation" type="checkbox" />
                            <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                            <input id="wd-file-upload" type="checkbox" />
                            <label htmlFor="wd-file-upload">File Uploads</label>
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-assign-to">Assign</label>
                        </td>
                        <td>
                            Assign to
                            <br />
                            <input id="wd-assign-to" value={"Everyone"} />
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td></td>
                        <td>
                            <label htmlFor="wd-due-date">Due</label><br />
                            <input id="wd-due-date" type="date" ></input>
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td></td>
                        <td>
                            <label htmlFor="wd-available-from">Available from</label><br />
                            <input id="wd-available-from" type="date"></input>
                        </td>
                        <td>
                            <label htmlFor="wd-available-until">Until</label><br />
                            <input id="wd-available-until" type="date"></input>
                        </td>
                    </tr>
                </table>
                <hr />
                <table align="right">
                    <td align="right">
                        <button id="wd-cancel">Cancel</button>
                    </td>
                    <td align="right">
                        <button id="wd-save">Save</button>
                    </td>
                </table>

            </div>
        </div>
    )
}