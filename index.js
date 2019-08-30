const firstChannelName = document.getElementById('firstChannelName');
const firstChannelValue = document.getElementById('firstChannelValue');
const searchBtn = document.getElementById('searchBtn');
const secondChannelName = document.getElementById('secondChannelName');
const secondChannelValue = document.getElementById('secondChannelValue');
const search2Btn = document.getElementById('search2Btn');
const differenceName = document.getElementById('differenceName');
const difference = document.getElementById('differenceValue');
let d1;
let d2;

const search1 = () => {
    const input = document.getElementById('channelInput');
    fetch(`https://mixer.com/api/v1/channels/${input.value}?fields=id`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            firstChannelName.innerHTML = input.value + ': ';
            setInterval(() => {
                fetch(`https://mixer.com/api/v2/levels/patronage/channels/${data.id}/status`)
                    .then(res => {
                        return res.json();
                    })
                    .then(data1 => {
                        firstChannelValue.innerHTML = data1.patronageEarned;
                        d1 = data1.patronageEarned;
                    });
            }, 5000);
        });
};

const search2 = () => {
    const input = document.getElementById('channel2Input');
    fetch(`https://mixer.com/api/v1/channels/${input.value}?fields=id`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            secondChannelName.innerHTML = input.value + ': ';
            differenceName.style.visibility = 'visible';
            setInterval(() => {
                fetch(`https://mixer.com/api/v2/levels/patronage/channels/${data.id}/status`)
                    .then(res => {
                        return res.json();
                    })
                    .then(data1 => {
                        secondChannelValue.innerHTML = data1.patronageEarned;
                        d2 = data1.patronageEarned;
                        setInterval(() => {
                            if (d1 < d2) {
                                difference.innerHTML = (d2 - d1);
                            } else {
                                difference.innerHTML = (d1 - d2);
                            }
                        }, 2500);
                    });
            }, 5000);
        });
};

searchBtn.onclick = () => search1();
search2Btn.onclick = () => search2();
