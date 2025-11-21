const Offers = ({ offer }) => {
    return (
        <div className="mega-offer-content">
            <div className="offer-left">
                <div className="percentage-off">
                    <span className="number">{offer.discount}</span>
                    <div className="off-text">
                        <span className="percent">%</span>
                        <span className="off">OFF</span>
                    </div>
                </div>
            </div>
            <div className="offer-center">
                <h1 className="mega-text">{offer.title}</h1>
                <h2 className="offer-text">{offer.subtitle}</h2>
            </div>
            <div className="offer-right">
                <p className="description">
                    {offer.description.split('\n').map((line, i) => (
                        <span key={i}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default Offers;