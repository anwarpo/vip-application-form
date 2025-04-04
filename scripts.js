// Define the Discord webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1343364934649643112/OUdQ13PdWrNu6ltjfoNpvbtTvmpYJYLcrCFTo8i75kjoP0yz55Zhh5jcjfnm_rIYMPuP'; // Replace with your actual Discord webhook URL

// Function to send data to Discord webhook
function sendToDiscord(formData) {
  const payload = {
    content: `**New VIP Application** :tada:\n\n` +
             `**Discord Username:** ${formData.discord} :bust_in_silhouette:\n` +
             `**FiveM License or Discord ID:** ${formData.fivem} :id:\n` +
             `**Character's Name:** ${formData.characterName} :guardsman:\n` +
             `**Character's Age:** ${formData.characterAge} :calendar:\n` +
             `**Previous Roleplay Experience:** ${formData.experience} :book:\n` +
             `**Reason for VIP Application:** ${formData.reason} :memo:\n` +
             `**VIP Package:** ${formData.vipPackage} :package:\n` +
             `**Price in Euros (€):** ${formData.vipPrice} :euro:`
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      alert('Application submitted successfully!');
      document.getElementById('vipForm').reset(); // Reset the form
    } else {
      alert('Failed to submit application. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error sending data to Discord webhook:', error);
    alert('An error occurred. Please try again.');
  });
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission

  // Check if all rule checkboxes are checked
  const rules = document.querySelectorAll('.rule-checkbox');
  let allChecked = true;
  rules.forEach(rule => {
    if (!rule.checked) {
      allChecked = false;
    }
  });

  if (!allChecked) {
    alert('You must agree to all terms and conditions.');
    return false;
  }

  // Collect form data
  const formData = {
    discord: document.getElementById('discord').value,
    fivem: document.getElementById('fivem').value,
    characterName: document.getElementById('characterName').value,
    characterAge: document.getElementById('characterAge').value,
    experience: document.getElementById('experience').value,
    reason: document.getElementById('reason').value,
    vipPackage: document.getElementById('vipPackage').value,
    vipPrice: document.getElementById('vipPrice').value
  };

  // Send data to Discord webhook
  sendToDiscord(formData);
}

// Initialize form behavior
function initializeForm() {
  const form = document.getElementById('vipForm');
  form.addEventListener('submit', handleFormSubmission);
}

// Initialize the form when the document is ready
document.addEventListener('DOMContentLoaded', initializeForm);
