import { useState } from 'react'
import "../css/write.css"
const CATEGORIES = [
  "Technology","Programming","Science","Health",
  "Travel","Food","Business","Education","Entertainment","Sports","Lifestyle","Other"
]

const Write = () => {
  const [title,     setTitle]     = useState('')
  const [category,  setCategory]  = useState('')
  const [content,   setContent]   = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [preview,   setPreview]   = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [success,   setSuccess]   = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB')
      return
    }
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!e.target.reportValidity()) return

    setLoading(true)
    setError('')
    setSuccess(false)

    const formData = new FormData()
    formData.append('title',    title)
    formData.append('category', category)
    formData.append('content',  content)
    if (imageFile) formData.append('image', imageFile)

    try {
      const res = await fetch('https://postlybackend-ovcm.onrender.com/api/blogs/blog', {
        method:      'POST',
        credentials: 'include',
        body:        formData
      })
      let data=await res.json()
      if (!res.ok) throw new Error(data.message || "Posting failed");
      setSuccess(true)
      setTitle(''); setCategory(''); setContent('')
      setImageFile(null); setPreview(null)
    } catch (err) {
      setError('Failed to publish. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      {error   && <p style={{ color: 'red',   margin: '0 0 12px' }}>{error}</p>}
      {success && <p style={{ color: 'green', margin: '0 0 12px' }}>Blog published successfully!</p>}

      <input
        required
        type="text"
        placeholder="Post title…"
        value={title}
        onChange={e => setTitle(e.target.value)}
        maxLength={120}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <select required value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select category</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        
      </div>

      <textarea
        required
        placeholder="Write something interesting…"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={8}
      />

      {!preview ? (
        <label style={{
          display: 'block', border: '1.5px dashed #ccc',
          borderRadius: 8, padding: '2rem', textAlign: 'center', cursor: 'pointer'
        }}>
          <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
          <p>Click to upload cover image</p>
          <span style={{ fontSize: 12, color: '#888' }}>JPG, PNG, WEBP — max 5MB</span>
        </label>
      ) : (
        <div style={{ position: 'relative' }}>
          <img
            src={preview}
            alt="preview"
            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
          />
          <button
            type="button"
            onClick={removeImage}
            style={{ position: 'absolute', top: 8, right: 8 }}
          >
            Remove
          </button>
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Publishing…' : 'Publish'}
      </button>

    </form>
  )
}

export default Write