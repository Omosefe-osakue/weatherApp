using Microsoft.AspNetCore.Mvc;
using MyWebApp.Models;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace MyWebApp.Controllers
{
    public class WeatherController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<WeatherController> _logger;

        public WeatherController(IHttpClientFactory httpClientFactory, ILogger<WeatherController> logger)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index() => View();

        [HttpPost]
        public async Task<IActionResult> Index(string city)
        {
            if (string.IsNullOrEmpty(city)) 
            {
                ViewBag.Error = "Please enter a city name";
                return View();
            }

            try
            {
                var client = _httpClientFactory.CreateClient();
                string apiKey = "5add06b1ed10fd8de9a96d02038c3629";
                string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric";

                _logger.LogInformation($"Calling OpenWeatherMap API for city: {city}");
                var response = await client.GetAsync(url);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError($"API request failed with status code {response.StatusCode}: {responseContent}");
                    ViewBag.Error = "Failed to get weather data. Please check the city name and try again.";
                    return View();
                }

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                
                var weatherData = JsonSerializer.Deserialize<WeatherResponse>(responseContent, options);
                
                if (weatherData == null || weatherData.Weather == null || !weatherData.Weather.Any())
                {
                    _logger.LogError("Failed to deserialize weather data");
                    ViewBag.Error = "Failed to process weather data. Please try again.";
                    return View();
                }

                return View(weatherData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting weather data");
                ViewBag.Error = "An error occurred while getting weather data. Please try again later.";
                return View();
            }
        }
    }
}
