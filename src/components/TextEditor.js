import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TextEditor.css';

const TextEditor = () => {
  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTextContent();
  }, []);

  const fetchTextContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://priceofjuice.com/api/admin/text');
      setTextContent(response.data.text || '');
      setError('');
    } catch (err) {
      setError('Failed to fetch text content');
      console.error('Error fetching text:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      await axios.patch('https://priceofjuice.com/api/admin/text', {
        text: textContent
      });
      
      setSuccess('Text content updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update text content');
      console.error('Error updating text:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    fetchTextContent();
  };

  if (loading) return <div className="loading">Loading text content...</div>;

  return (
    <div className="text-editor-container">
      <header className="text-editor-header">
        <Link to="/" className="back-button">← Back to Dashboard</Link>
        <h1>Text Content Editor</h1>
      </header>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="text-editor-content">
        <div className="editor-section">
          <label htmlFor="text-content">Website Text Content:</label>
          <textarea
            id="text-content"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Enter your text content here..."
            rows={15}
            className="text-area"
          />
          
          <div className="text-info">
            <p>This text will be displayed on your website. You can use HTML tags for formatting.</p>
            <p>Current length: {textContent.length} characters</p>
          </div>
        </div>

        <div className="editor-actions">
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="save-button"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button 
            onClick={handleReset} 
            className="reset-button"
          >
            Reset to Original
          </button>
        </div>

        <div className="preview-section">
          <h3>Preview</h3>
          <div className="preview-content">
            {textContent ? (
              <div dangerouslySetInnerHTML={{ __html: textContent }} />
            ) : (
              <p className="no-content">No content to preview</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
