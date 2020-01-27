import React from 'react';
import { Button } from 'components';
import styled from 'styled-components';

import { media } from '../utils/media';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  margin-top: 1rem;
  width: 50%;
  min-width: 340px;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  form {
    p {
      label,
      input {
        display: block;
      }
      input {
        min-width: 275px;
        margin-top: 0.5rem;
      }
      textarea {
        resize: vertical;
        min-height: 150px;
        width: 100%;
        margin-top: 0.5rem;
      }
    }
  }
`;

const Signup = () => (
  <Content>
    <h3>Join my newsletter!</h3>
    <form name="signup-form" method="POST" netlify-honeypot="bot-field" data-netlify="true" action="/success">
      <p style={{ display: 'none' }} className="hidden">
        <label htmlFor="bot-field">
          Don't fill this out if you're human:
          <input id="bot-field" name="bot-field" />
        </label>
      </p>
      <p>
        <label htmlFor="signup-name">
          Name
          <input name="name" id="signup-name" type="text" required />
        </label>
      </p>
      <p>
        <label htmlFor="signup-email">
          E-Mail <input name="email" id="signup-email" type="email" required />
        </label>
      </p>
      <p>
        <Button>Send</Button>
      </p>
      <input type="hidden" name="form-name" value="signup-form" />
    </form>
  </Content>
);

export default Signup;
