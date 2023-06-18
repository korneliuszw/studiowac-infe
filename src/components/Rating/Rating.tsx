interface RatingProps {
    rating: number;
}

export default function Rating({rating}: RatingProps) {
    return <div className={"badge badge-primary"}>
        Perspektywy: {rating} miejsce
    </div>
}