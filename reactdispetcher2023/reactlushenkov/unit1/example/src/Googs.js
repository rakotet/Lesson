export default function Goods(props) {
  return (
    <div className="goods-block">
      <h3>{props.title}</h3>
      <p>{props.cost}</p>
      <img src={props.image} alt="" />
    </div>
  );
}