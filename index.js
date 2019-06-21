const firstChannelName = document.getElementById("firstChannelName");
const firstChannelValue = document.getElementById("firstChannelValue");
const searchBtn = document.getElementById("searchBtn");
const secondChannelName = document.getElementById("secondChannelName");
const secondChannelValue = document.getElementById("secondChannelValue");
const search2Btn = document.getElementById("search2Btn");
const differenceName = document.getElementById("differenceName");
const difference = document.getElementById("differenceValue");


const Search1 = () => {
    const input = document.getElementById("channelInput");
    fetch(`https://mixer.com/api/v1/channels/${input.value}?fields=id`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            firstChannelName.innerHTML = input.value + ": ";
            setInterval(() => {
                fetch(`https://mixer.com/api/v2/levels/patronage/channels/${data.id}/status`)
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        console.log(data);
                        firstChannelValue.innerHTML = data.patronageEarned;
                    })
            }, 5000);
        })
}

const Search2 = () => {
    const input = document.getElementById("channel2Input");
    fetch(`https://mixer.com/api/v1/channels/${input.value}?fields=id`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            secondChannelName.innerHTML = input.value + ": ";
            differenceName.style.visibility = "visible";
            setInterval(() => {
                fetch(`https://mixer.com/api/v2/levels/patronage/channels/${data.id}/status`)
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        secondChannelValue.innerHTML = data.patronageEarned;
                        setInterval(() => {
                            if (parseInt(firstChannelValue.innerHTML) < parseInt(secondChannelValue.innerHTML)) {
                                difference.innerHTML = parseInt(firstChannelValue.innerHTML) - parseInt(secondChannelValue.innerHTML);
                            } else {
                                difference.innerHTML = parseInt(secondChannelValue.innerHTML) - parseInt(firstChannelValue.innerHTML);
                            }
                        })
                    })
            }, 5000);
        })
}

searchBtn.onclick = () => Search1();
search2Btn.onclick = () => Search2();