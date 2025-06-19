// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".competency-item, .portfolio-item, .contact-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease"
  observer.observe(el)
})

// Skills Chart
const canvas = document.getElementById("skillsChart")
const ctx = canvas.getContext("2d")

// Set canvas size
canvas.width = 400
canvas.height = 300

// Skills data
const skills = [
  { name: "Полиграфия", value: 90, color: "#6366f1" },
  { name: "Фотография", value: 85, color: "#8b5cf6" },
  { name: "Видеопродукция", value: 80, color: "#f59e0b" },
  { name: "Дизайн", value: 95, color: "#ef4444" },
]

// Draw skills chart
function drawSkillsChart() {
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 80

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  let currentAngle = -Math.PI / 2

  skills.forEach((skill, index) => {
    const sliceAngle = (skill.value / 100) * 2 * Math.PI

    // Draw slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.closePath()
    ctx.fillStyle = skill.color
    ctx.fill()

    // Draw label
    const labelAngle = currentAngle + sliceAngle / 2
    const labelX = centerX + Math.cos(labelAngle) * (radius + 30)
    const labelY = centerY + Math.sin(labelAngle) * (radius + 30)

    ctx.fillStyle = "#1f2937"
    ctx.font = "12px Inter"
    ctx.textAlign = "center"
    ctx.fillText(skill.name, labelX, labelY)
    ctx.fillText(`${skill.value}%`, labelX, labelY + 15)

    currentAngle += sliceAngle
  })
}

// Animate chart on scroll
const chartObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(drawSkillsChart, 500)
      }
    })
  },
  { threshold: 0.5 },
)

chartObserver.observe(canvas)

// Contact form handling
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !message) {
    alert("Пожалуйста, заполните все поля")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Отправка..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Сообщение отправлено! Спасибо за обращение.")
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Portfolio item interactions
document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation()
    const portfolioItem = btn.closest(".portfolio-item")
    const title = portfolioItem.querySelector("h3").textContent
    alert(`Просмотр проекта: ${title}\n\nЗдесь может быть модальное окно с подробной информацией о проекте.`)
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-background")
  const speed = scrolled * 0.5

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const titleLines = heroTitle.querySelectorAll(".title-line")
    titleLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = "1"
        line.style.transform = "translateY(0)"
      }, index * 200)
    })
  }
})

// Add smooth reveal animations
const revealElements = document.querySelectorAll(".section-header, .about-description, .contact-info")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.2 },
)

revealElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(50px)"
  el.style.transition = "all 0.8s ease"
  revealObserver.observe(el)
})
