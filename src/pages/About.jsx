import React from 'react'
import "../css/about.css"

const About = () => {
  return (
    <div className='about_main'>
      <div className="back"></div>

      <div className="about-wrapper">

        <div className="about-hero">
          <h1>About BlogSpace</h1>
          <p>
            A place where people share their thoughts, experiences, stories,
            emotions, ideas, and moments that matter.
          </p>
        </div>


        <div className="about-section">
          <h2>What is BlogSpace?</h2>

          <p>
            BlogSpace is a community where people can express themselves freely.
            It is a space to share personal journeys, life experiences, opinions,
            lessons learned, struggles, achievements, and everything in between.
          </p>

          <p>
            Everyone has a story. Some share their dreams, some share their
            challenges, some share their knowledge, and some simply want to be
            heard. BlogSpace brings these voices together in one place.
          </p>

          <p>
            Our goal is to create a meaningful environment where people connect,
            understand different perspectives, inspire each other, and grow
            together.
          </p>
        </div>


        <div className="about-section">
          <h2>Who is it for?</h2>

          <div className="about-features">

            <div className="about-feature-card">
              <span>💭</span>
              <h3>Thinkers</h3>
              <p>
                Share ideas, opinions, and perspectives about the world around you.
              </p>
            </div>

            <div className="about-feature-card">
              <span>❤️</span>
              <h3>Storytellers</h3>
              <p>
                Express feelings, memories, personal stories, and life experiences.
              </p>
            </div>

            <div className="about-feature-card">
              <span>🌱</span>
              <h3>Learners</h3>
              <p>
                Share your growth journey, lessons, failures, and discoveries.
              </p>
            </div>

            <div className="about-feature-card">
              <span>✨</span>
              <h3>Creators</h3>
              <p>
                Turn your imagination and creativity into something meaningful.
              </p>
            </div>

            <div className="about-feature-card">
              <span>🤝</span>
              <h3>Community</h3>
              <p>
                Connect with people who understand and appreciate your voice.
              </p>
            </div>

            <div className="about-feature-card">
              <span>🌎</span>
              <h3>Everyone</h3>
              <p>
                Because every person has something valuable to share.
              </p>
            </div>

          </div>
        </div>


        <div className="about-section">
          <h2>What can you do here?</h2>

          <div className="about-features">

            <div className="about-feature-card">
              <span>✍️</span>
              <h3>Share Your Voice</h3>
              <p>
                Write about your thoughts, experiences, emotions, and ideas.
              </p>
            </div>


            <div className="about-feature-card">
              <span>📖</span>
              <h3>Tell Your Story</h3>
              <p>
                Document moments from your journey and inspire others.
              </p>
            </div>


            <div className="about-feature-card">
              <span>💬</span>
              <h3>Connect</h3>
              <p>
                Discover people, conversations, and stories from different lives.
              </p>
            </div>


            <div className="about-feature-card">
              <span>🌟</span>
              <h3>Inspire Others</h3>
              <p>
                Your experience might be exactly what someone needs to hear.
              </p>
            </div>


            <div className="about-feature-card">
              <span>🔒</span>
              <h3>Your Space</h3>
              <p>
                A personal place to keep and share the things that matter to you.
              </p>
            </div>


            <div className="about-feature-card">
              <span>🌱</span>
              <h3>Grow Together</h3>
              <p>
                Learn from others and become better through shared experiences.
              </p>
            </div>

          </div>
        </div>


        <div className="about-section">
          <h2>Our Vision</h2>

          <p>
            We believe every person carries unique experiences, emotions, and
            ideas worth sharing. BlogSpace aims to become a place where people
            feel heard, understood, and connected.
          </p>

          <p>
            A place where a small thought can become an inspiration,
            a personal story can create connection, and a shared experience
            can make someone's day better.
          </p>

        </div>


        <div className="about-section about-contact">

          <h2>Contact</h2>

          <p>
            Have ideas, feedback, or want to share something with us?
            We would love to hear from you.
          </p>


          <div className="about-contact-details">

            <div className="about-contact-item">
              <span>👤</span>
              <span>Samir</span>
            </div>


            <div className="about-contact-item">
              <span>📧</span>
              <a href="mailto:samirbhandari1231@gmail.com">
                samirbhandari1231@gmail.com
              </a>
            </div>


            <div className="about-contact-item">
              <span>📞</span>
              <a href="tel:9769220601">
                9769220601
              </a>
            </div>


            <div className="about-contact-item">
              <span>🌐</span>
              <a
                href="https://github.com/codeewithhmee"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>

          </div>

        </div>


      </div>
    </div>
  )
}

export default About