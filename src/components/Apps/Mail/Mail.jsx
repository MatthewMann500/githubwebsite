import React, { useState } from 'react';
import './Mail.css';

const Mail = () => {
  const [statusMessage, setStatusMessage] = useState('Ready to send your message...');
  const [sending, setSending] = useState(false);

  const handleClear = () => {
    document.getElementById('mail-form').reset();
    setStatusMessage('Ready to send your message...');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage('Sending...');

    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/meokjlyg', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        e.target.reset();
      } else {
        setStatusMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatusMessage('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mail-container">
      <div className="mail-toolbar">
        <button type="button" onClick={handleClear} disabled={sending}>New</button>
        <button type="submit" form="mail-form" disabled={sending}>Send</button>
        <button type="button" onClick={handleClear} disabled={sending}>Clear</button>
      </div>
      <form
        id="mail-form"
        className="mail-form"
        onSubmit={handleSubmit}
      >
        <div className="mail-fields">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
        </div>
        <textarea name="message" placeholder="Your Message..." required></textarea>
      </form>
      <div className="mail-status-bar">Status: {statusMessage}</div>
    </div>
  );
};

export default Mail;
