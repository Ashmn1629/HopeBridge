const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/donate", (req, res) => {
  const { name, email, amount, message } = req.body;
  const donationEntry = `Name: ${name}, Email: ${email}, Amount: $${amount}, Message: ${message}\n`;

  fs.appendFile("donations.txt", donationEntry, (err) => {
    if (err) {
      console.error("❌ Error saving donation:", err);
      return res.status(500).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error - Donation Failed</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              min-height: 100vh;
              background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            .error-container {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(20px);
              border-radius: 24px;
              padding: 40px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
              text-align: center;
              max-width: 500px;
              animation: shake 0.5s ease-in-out;
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-10px); }
              75% { transform: translateX(10px); }
            }
            .error-icon { font-size: 4rem; margin-bottom: 20px; }
            .error-title { font-size: 2rem; color: #dc2626; margin-bottom: 15px; }
            .error-message { color: #666; font-size: 1.1rem; margin-bottom: 30px; }
            .back-btn {
              display: inline-block;
              padding: 12px 30px;
              background: linear-gradient(135deg, #ff6b6b, #ee5a52);
              color: white;
              text-decoration: none;
              border-radius: 12px;
              font-weight: 600;
              transition: transform 0.3s ease;
            }
            .back-btn:hover { transform: translateY(-2px); }
          </style>
        </head>
        <body>
          <div class="error-container">
            <div class="error-icon">❌</div>
            <h1 class="error-title">Oops! Something went wrong</h1>
            <p class="error-message">We encountered an error processing your donation. Please try again.</p>
            <a href="/" class="back-btn">Try Again</a>
          </div>
        </body>
        </html>
      `);
    }

    console.log("💰 Donation received:", { name, email, amount, message });

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Donation Successful</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            min-height: 100vh;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-x: hidden;
          }

          .success-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 50px 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 600px;
            width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideUp 0.8s ease-out;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .success-icon {
            font-size: 5rem;
            margin-bottom: 25px;
            animation: bounceIn 1s ease-out 0.3s both;
          }

          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .success-title {
            font-size: 2.8rem;
            font-weight: 700;
            background: linear-gradient(135deg, #10b981, #059669);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
            animation: fadeInUp 0.8s ease-out 0.5s both;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .success-message {
            color: #374151;
            font-size: 1.3rem;
            margin-bottom: 30px;
            line-height: 1.6;
            animation: fadeInUp 0.8s ease-out 0.7s both;
          }

          .donation-details {
            background: rgba(16, 185, 129, 0.1);
            border-radius: 16px;
            padding: 25px;
            margin-bottom: 35px;
            border: 1px solid rgba(16, 185, 129, 0.2);
            animation: fadeInUp 0.8s ease-out 0.9s both;
          }

          .donation-amount {
            font-size: 3rem;
            font-weight: 800;
            color: #10b981;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
          }

          .donation-message {
            color: #6b7280;
            font-style: italic;
            margin-top: 15px;
            font-size: 1.1rem;
          }

          .action-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease-out 1.1s both;
          }

          .btn {
            padding: 15px 30px;
            border-radius: 16px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .btn-primary {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
          }

          .btn-secondary {
            background: rgba(255, 255, 255, 0.9);
            color: #374151;
            border: 2px solid #e5e7eb;
          }

          .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .btn-primary:hover {
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
          }

          .floating-hearts {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
          }

          .heart {
            position: absolute;
            font-size: 2rem;
            color: rgba(16, 185, 129, 0.6);
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
            }
          }

          .impact-note {
            background: rgba(59, 130, 246, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-top: 30px;
            border-left: 4px solid #3b82f6;
            animation: fadeInUp 0.8s ease-out 1.3s both;
          }

          .impact-note h3 {
            color: #3b82f6;
            margin-bottom: 8px;
            font-size: 1.2rem;
          }

          .impact-note p {
            color: #6b7280;
            line-height: 1.5;
          }

          @media (max-width: 480px) {
            .success-container {
              padding: 40px 25px;
            }
            
            .success-title {
              font-size: 2.2rem;
            }
            
            .donation-amount {
              font-size: 2.5rem;
            }
            
            .action-buttons {
              flex-direction: column;
              align-items: center;
            }
            
            .btn {
              width: 100%;
              max-width: 250px;
            }
          }
        </style>
      </head>
      <body>
        <div class="floating-hearts">
          <div class="heart" style="left: 10%; animation-delay: 0s;">💚</div>
          <div class="heart" style="left: 20%; animation-delay: 1s;">✨</div>
          <div class="heart" style="left: 30%; animation-delay: 2s;">🙏</div>
          <div class="heart" style="left: 40%; animation-delay: 3s;">💚</div>
          <div class="heart" style="left: 50%; animation-delay: 4s;">⭐</div>
          <div class="heart" style="left: 60%; animation-delay: 5s;">💚</div>
          <div class="heart" style="left: 70%; animation-delay: 1.5s;">✨</div>
          <div class="heart" style="left: 80%; animation-delay: 2.5s;">🙏</div>
          <div class="heart" style="left: 90%; animation-delay: 0.5s;">💚</div>
        </div>

        <div class="success-container">
          <div class="success-icon">🎉</div>
          
          <h1 class="success-title">Thank you, ${name}!</h1>
          
          <p class="success-message">
            Your generous donation has been received and will make a real difference in our mission.
          </p>

          <div class="donation-details">
            <div class="donation-amount">$${amount}</div>
            <p><strong>Email:</strong> ${email}</p>
            ${message ? `<p class="donation-message">"${message}"</p>` : ""}
          </div>

          <div class="action-buttons">
            <a href="/" class="btn btn-primary">Make Another Donation</a>
            <a href="/about" class="btn btn-secondary">See Our Impact</a>
          </div>

          <div class="impact-note">
            <h3>🌟 Your Impact</h3>
            <p>Every dollar you donate helps us continue our work and reach more people in need. Thank you for being part of our mission!</p>
          </div>
        </div>

        <script>
          // Add some extra interactivity
          document.addEventListener('DOMContentLoaded', function() {
            // Confetti effect simulation with more floating elements
            setTimeout(() => {
              for (let i = 0; i < 10; i++) {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['🎊', '🎉', '⭐', '✨'][Math.floor(Math.random() * 4)];
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-50px';
                confetti.style.fontSize = '2rem';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = \`float \${3 + Math.random() * 3}s ease-out forwards\`;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 6000);
              }
            }, 1000);
          });
        </script>
      </body>
      </html>
    `);
  });
});

app.get("/view-donations", (req, res) => {
  fs.readFile("donations.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to read donations");
    }
    res.send(`<pre>${data}</pre>`);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "donate.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Charity server is running at http://localhost:${PORT}`);
});
