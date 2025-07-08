/**
 * Weather App - Main JavaScript
 * Handles form submissions, UI interactions, and API calls
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle form submissions
    const weatherForm = document.getElementById('weatherForm');
    if (weatherForm) {
        weatherForm.addEventListener('submit', handleWeatherFormSubmit);
    }

    // Quick city buttons
    const quickCityButtons = document.querySelectorAll('.quick-city');
    quickCityButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const city = this.getAttribute('data-city');
            if (city) {
                showLoading();
                window.location.href = `/Weather?city=${encodeURIComponent(city)}`;
            }
        });
    });

    // Auto-focus search input on page load
    const searchInput = document.getElementById('city');
    if (searchInput) {
        searchInput.focus();
    }
});

/**
 * Handle weather form submission
 * @param {Event} e - Form submit event
 */
async function handleWeatherFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const cityInput = form.querySelector('input[name="city"]');
    const city = cityInput.value.trim();
    
    if (!city) {
        showToast('Please enter a city name', 'warning');
        cityInput.focus();
        return;
    }
    
    showLoading();
    form.submit();
}

/**
 * Show loading spinner
 */
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.remove('d-none');
    }
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('d-none');
    }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    const toastElement = document.createElement('div');
    toastElement.innerHTML = toastHtml.trim();
    const toastNode = toastElement.firstChild;
    
    toastContainer.appendChild(toastNode);
    const toast = new bootstrap.Toast(toastNode, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remove toast from DOM after it's hidden
    toastNode.addEventListener('hidden.bs.toast', function() {
        toastNode.remove();
    });
}

// Export functions for use in other modules if needed
window.App = {
    showLoading,
    hideLoading,
    showToast
};
