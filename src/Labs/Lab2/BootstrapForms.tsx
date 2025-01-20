import React from 'react';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';

const BootstrapForms: React.FC = () => {
    return (
        <div id="wd-css-styling-forms">
            <h2>Forms</h2>
            <FormGroup className="mb-3" controlId="wd-email">
                <FormLabel>Email address</FormLabel>
                <FormControl type="email" placeholder="name@example.com" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="wd-textarea">
                <FormLabel>Example textarea</FormLabel>
                <FormControl as="textarea" rows={3} />
            </FormGroup>
        </div>
    );
};

export default BootstrapForms;
