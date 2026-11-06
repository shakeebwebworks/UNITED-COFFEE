export default function Rating({ value = 0, count }) {
  return (
    <span className="uc-rating" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const icon = value >= n ? 'bi-star-fill' : value >= n - 0.5 ? 'bi-star-half' : 'bi-star'
        return <i key={n} className={`bi ${icon}`}></i>
      })}
      <b>{value.toFixed(1)}</b>
      {count !== undefined && <small>({count})</small>}
    </span>
  )
}