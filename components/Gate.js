import { useDrag } from 'react-dnd';

const Gate = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'GATE',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag} // Make it draggable
      style={{
        backgroundColor: type === 'H' ? '#006A71' : '#006A71',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 106, 113, 0.4)',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1, // Make it semi-transparent when dragging
      }}
    >
      {type}
    </button>
  );
};

export default Gate;
