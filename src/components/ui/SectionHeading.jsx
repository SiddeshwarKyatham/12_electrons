function SectionHeading({ title, copy, className = '' }) {
  return (
    <div className={className}>
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  )
}

export default SectionHeading
