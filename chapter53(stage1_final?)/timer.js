function Timer(time){
    this.cnt = time;
}

/**
 * timer update
 * 
 * isStop:時間を止めるフラグ
 * state:マリオのゴールアニメーション状態
 * 
 * 時間切れ:trueを返す
 */
Timer.prototype.update = function(state){
    switch(state){
        case NONE_ANIMATION:
            this.cnt--;        
            break;
        case GOAL_ANIMATION_TIME_CNT:
            this.cnt -= 60;
            gScore += 50;
            break;
    }
    if(this.cnt <= 0){
        this.cnt = 0;
        return true;           
    }
    return false;
}
