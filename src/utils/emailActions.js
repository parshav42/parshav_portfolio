import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const getLocation = () => new Promise((resolve) => {
  if (!navigator.geolocation) {
    resolve('Location unavailable')
    return
  }
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => resolve(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`),
    () => resolve('Location unavailable'),
    { timeout: 5000, maximumAge: 300000 },
  )
})

const sendEmail = async (templateParams) => {
  if (!serviceId || !templateId || !publicKey) return false
  await emailjs.send(serviceId, templateId, templateParams, { publicKey })
  return true
}

export const handleDownloadResume = async () => {
  const location = await getLocation()
  try {
    await sendEmail({
      to_email: 'parshavkhoche16@gmail.com',
      subject: 'Resume Downloaded!',
      message: `Someone from ${location} just downloaded your resume.`,
      location,
    })
  } catch {
    // The download should still work when EmailJS is unavailable.
  }

  const link = document.createElement('a')
  link.href = '/Parshav_Khoche_Resume_.pdf'
  link.download = 'Parshav_Khoche_Resume.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const sendProjectContact = async ({ name, email, message, projectName }) => {
  const location = await getLocation()
  return sendEmail({
    to_email: 'parshavkhoche16@gmail.com',
    subject: `Contact from ${projectName}`,
    message,
    name,
    email,
    location,
    project_name: projectName,
  })
}
