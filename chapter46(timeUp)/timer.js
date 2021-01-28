function Timer(time){
    this.cnt = time;
}

/**
 * timer update
 * 
 * 時間切れ:trueを返す
 */
Timer.prototype.update = function(){
	if(this.cnt == 0){
        return true;
    }
    this.cnt--;
    return false;
}
