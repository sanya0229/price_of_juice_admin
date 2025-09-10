import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TextEditor.css';

// Text editor component for managing website content
const TextEditor = () => {
  // State management for text content and UI states
  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load text content on component mount
  useEffect(() => {
    fetchTextContent();
  }, []);

  // Fetch text content from API
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

  // Save text content to API
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

  // Reset text content to original
  const handleReset = () => {
    fetchTextContent();
  };

  // Show loading state
  if (loading) return <div className="loading">Loading text content...</div>;

  return (
    <div className="text-editor-container">
      {/* Header with navigation */}
      <header className="text-editor-header">
        <Link to="/" className="back-button">← Back to Dashboard</Link>
        <h1>Text Content Editor</h1>
      </header>

      {/* Error and success messages */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="text-editor-content">
        {/* Text editing section */}
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

        </div>

        {/* Action buttons */}
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

        {/* Live preview section */}
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
