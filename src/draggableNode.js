// draggableNode.js

export const DraggableNode = ({ type, label, id }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };





  return (
    <div
      className={`${type} cursor-grab min-w-[80px] h-[60px] flex items-center rounded-lg bg-[#1C2536] justify-center flex-col`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span style={{ color: '#fff' }}>{label}</span>
    </div >
  );
};
