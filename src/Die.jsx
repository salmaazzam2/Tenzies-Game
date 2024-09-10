/* eslint-disable react/prop-types */


function Die({value, isHeld, onClick}) {
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "#FFE6EE"
    }
  return (
    <div className="w-10 h-10 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg bg-pink-200 cursor-pointer flex items-center font-karla text-2xl justify-center shadow-xl" onClick={onClick} style={styles}>{value}</div>
  )
}

export default Die