import React from 'react';

import classes from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={classes.cubes}>
            <div className={[classes.skcube,classes.skcube1].join(' ')}></div>
            <div className={[classes.skcube,classes.skcube2].join(' ')}></div>
            <div className={[classes.skcube,classes.skcube3].join(' ')}></div>
            <div className={[classes.skcube,classes.skcube4].join(' ')}></div>
            <div className={[classes.skcube,classes.skcube5].join(' ')}></div>
            <div className={[classes.skcube,classes.skcube6].join(' ')}></div>
            <div className={[classes.skcube,classes.skcube7].join(' ')}></div>
            <div className={[classes.skcube,classes.skcube8].join(' ')}></div>
            <div className={[classes.skcube,classes.skcube9].join(' ')}></div>
       </div>
    );
};

export default Loading;