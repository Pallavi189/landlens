import Icon from "./Icon";

function PanelTitle({ icon, title }) {
  return (
    <h2 className="panel-title">
      <span>
        <Icon name={icon} size={18} />
      </span>
      {title}
    </h2>
  );
}

export default PanelTitle;
