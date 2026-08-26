function ForecastCard({ day, condition, high, low, Icon }) {
  return (
    <article className="forecast-card" aria-label={`Forecast for ${day}: ${condition}`}>
      <span className="forecast-day">{day}</span>
      <Icon className="forecast-icon" aria-label={condition} />
      <span className="forecast-condition">{condition}</span>
      <div className="forecast-temperatures">
        <strong>{high}&deg;</strong>
        <span>{low}&deg;</span>
      </div>
    </article>
  );
}

export default ForecastCard;
