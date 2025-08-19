export default function Die({ value, isHeld, hold, gameWon}) {
    const styles = { backgroundColor: isHeld ? '#59E391': 'white' }
    
    return (
        <button 
            style={styles} 
            onClick={hold}
            aria-pressed={isHeld}
            disabled={gameWon}
            aria-label={`Die with value ${value}, ${isHeld? 'held' :'not held'}`}
        >
            {value}
        </button>
    )
}