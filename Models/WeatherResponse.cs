using System.Text.Json.Serialization;

namespace MyWebApp.Models;

public class WeatherResponse
{
    [JsonPropertyName("name")]
    public string City { get; set; } = string.Empty;

    [JsonPropertyName("main")]
    public MainData? Main { get; set; }

    [JsonPropertyName("weather")]
    public List<WeatherInfo> Weather { get; set; } = new();

    [JsonPropertyName("wind")]
    public WindData? Wind { get; set; }

    public WeatherResponse() { }
}

public class MainData
{
    [JsonPropertyName("temp")]
    public float Temp { get; set; }

    [JsonPropertyName("humidity")]
    public int Humidity { get; set; }
}

public class WeatherInfo
{
    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("icon")]
    public string Icon { get; set; } = string.Empty;
}

public class WindData
{
    [JsonPropertyName("speed")]
    public float Speed { get; set; }
}
