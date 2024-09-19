export default function Lab1() {
    return (
        <div id="wd-lab1">
            <h2>Lab 1</h2>
            <div id="wd-h-tag">
                <h4>Paragraph Tag</h4>
                <p id="wd-p-1">
                    This is a paragraph. We often separate a long set of sentences with vertical spaces to make the text easier to read. Browsers ignore vertical white spaces and render all the text as one single set of sentences. To force the browser to add vertical spacing, wrap the paragraphs you want to separate with the paragraph tag
                </p>
                <p id="wd-p-2">
                    This is the first paragraph. The paragraph tag is used to format
                    vertical gaps between long pieces of text like this one.
                </p>
                <p id="wd-p-3">
                    This is the second paragraph. Even though there is a deliberate white
                    gap between the paragraph above and this paragraph, by default
                    browsers render them as one contiguous piece of text as shown here on
                    the right.
                </p>
                <p id="wd-p-4">
                    This is the third paragraph. Wrap each paragraph with the paragraph
                    tag to tell browsers to render the gaps.
                </p>

            </div>
            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Pour batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>
                My Favorite Recipie:
                <ol id="wd-favorite-recepie">
                    <li>Heat up the milk.</li>
                    <li>Add chocolate powder and suar.</li>
                    <li>Stir to combine.</li>
                    <li>Serve.</li>
                </ol>
                <h5>Unordered List Tag</h5>
                My favorite books (in no particular order)

                <ul id="wd-my-books">
                    <li>Dune</li>
                    <li>Lord of the Rings</li>
                    <li>Ender's Game</li>
                    <li>Red Mars</li>
                    <li>The Forever War</li>
                </ul>
                Your favorite books (in no particular order)
                <ul id="wd-your-books">
                    <li>Dune</li>
                    <li>The Stand</li>
                    <li>11.22.63</li>
                    <li>Project Hail Mary</li>
                </ul>

            </div>

            <div id="wd-tables">
                <h4>Table Tag</h4>
                <table border={1} width="100%">
                    <thead>
                        <tr>
                            <th>Quiz</th>
                            <th>Topic</th>
                            <th>Date</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Q1</td>
                            <td>HTML</td>
                            <td>2/3/21</td>
                            <td>85</td>
                        </tr>
                        <tr>
                            <td>Q2</td>
                            <td>CSS</td>
                            <td>2/10/21</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>Q3</td>
                            <td>JavaScript</td>
                            <td>2/17/21</td>
                            <td>95</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>Average</td>
                            <td>90</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div id="wd-forms">
                <h4>Form Elements</h4>
                <form id="wd-text-fields">
                    <h5>Text Fields</h5>
                    <label htmlFor="wd-text-fields-username">Username:</label>
                    <input id="wd-text-fields-username" placeholder="jdoe" />
                    <br />
                    <label htmlFor="wd-text-fields-password">Password:</label>
                    <input type="password" id="wd-text-fields-password" value="123@#$asd" />
                    <br />
                    <label htmlFor="wd-text-fields-first-name">First name:</label>
                    <input type="text" id="wd-text-fields-first-name" title="John" />
                    <br />
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input type="text" id="wd-text-fields-last-name" placeholder="Doe"
                        value="Wonderland" title="The last name" />
                    {/* copy rest of form elements here  */}
                </form>
            </div>

            <div id="wd-radio-buttons">
                <h5 id="wd-radio-buttons">Radio buttons</h5>

                <label>Favorite movie genre:</label><br />

                <input type="radio" name="radio-genre" id="wd-radio-comedy" />
                <label htmlFor="wd-radio-comedy">Comedy</label><br />

                <input type="radio" name="radio-genre" id="wd-radio-drama" />
                <label htmlFor="wd-radio-drama">Drama</label><br />

                <input type="radio" name="radio-genre" id="wd-radio-scifi" />
                <label htmlFor="wd-radio-scifi">Science Fiction</label><br />

                <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
                <label htmlFor="wd-radio-fantasy">Fantasy</label>

            </div>

            <div id="wd-check-boxes">
                <h5 id="wd-checkboxes">Checkboxes</h5>
                <label>Favorite movie genre:</label><br />

                <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
                <label htmlFor="wd-chkbox-comedy">Comedy</label><br />

                <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
                <label htmlFor="wd-chkbox-drama">Drama</label><br />

                <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
                <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br />

                <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
                <label htmlFor="wd-chkbox-fantasy">Fantasy</label>

            </div>


        </div>
    );
}
