'use strict';

{
  const MEMBERS = [
    { id: 'shoma', nickname: 'しょうま', avatar: 'IMG_4210.JPG', role: 'member', birthday: 328 },
    { id: 'ryutoku', nickname: 'りゅうとく', avatar: 'IMG_4211.JPG', role: 'member', birthday: 104 },
    { id: 'ryuji', nickname: '梅ちゃん', avatar: 'IMG_4212.JPG', role: 'member', birthday: 325 },
  ];

  // let loginLog;

  // if (localStorage.getItem('loginLog') === null) {
  //   loginLog = [];
  // } else {
  //   loginLog = JSON.parse(localStorage.getItem('loginLog'));
  // }

  let loginLog;
  try {
    const stored = JSON.parse(localStorage.getItem('loginLog'));
    loginLog = Array.isArray(stored) ? stored : [];
  } catch (e) {
    loginLog = [];
  }


  const loginPage = document.getElementById('login-page');
  const welcome = document.getElementById('welcome');
  const contentList = document.getElementById('contentList');
  const comments = document.getElementById('comments');
  const bye = document.getElementById('bye');
  const slot = document.getElementById('slot');

  loginPage.hidden = false;
  welcome.hidden = true;
  contentList.hidden = true;
  comments.hidden = true;
  bye.hidden = true;
  slot.hidden = true;

  const close = document.getElementById('close');

  close.addEventListener('click', () => {
    document.body.classList.remove('mask');

    loginPage.hidden = true;
    bye.hidden = false;
  })


  const shoma = document.getElementById('shoma');
  const ryutoku = document.getElementById('ryutoku');
  const ryuji = document.getElementById('ryuji');

  document.querySelectorAll('.member').forEach(memberDiv => {
    memberDiv.addEventListener('click', () => {
      const clickedId = memberDiv.id;
      const member = MEMBERS.find(m => m.id === clickedId);

      const passward = Number(prompt('あなたの誕生日は？ ※1月1日→101'));

      if (passward !== member.birthday) {
        return;
      }

      document.body.classList.remove('mask');

      const section = document.getElementById('welcome');
      const container = section.querySelector('div');

      const img = document.createElement('img');
      img.src = member.avatar;
      const h1 = document.createElement('h1');
      h1.textContent = `🎉${member.nickname}さんようこそ！🎉`;
      container.append(img, h1);

      loginPage.hidden = true;
      welcome.hidden = false;
      contentList.hidden = false;
      comments.hidden = true;

      const entry = { id: clickedId, time: new Date().toLocaleString() };
      loginLog.push(entry);
      localStorage.setItem('loginLog', JSON.stringify(loginLog));
    });
  });


  const listOmikuji = document.getElementById('list-omikuji');
  const listNumbertuch = document.getElementById('list-numbertuch');
  const listSlot = document.getElementById('list-slot');

  listSlot.addEventListener('click', () => {

    let panel1Pattern, panel2Pattern, panel3Pattern;
    let bonus = false;
    const gogoLamp = document.getElementById('gogo-lamp');
    let bonusCounter = 0;
    const bonusEnd = 8;
    let normalCounter = 3;
    let janbari = false;
    let janbariCounter = 0;
    const janbariEnd = 8;
    let clownCounter;


    const gogoSe = new Audio('SlotMp3/ジャグラー ペカリ 効果音.mp3');
    gogoSe.preload = 'auto';
    const bonusSe = new Audio('SlotMp3/ジャグラーボーナス中.mp3');
    bonusSe.preload = 'auto';
    bonusSe.loop = true;
    const stopSe = new Audio('SlotMp3/ジャグラー ボタン .mp3');
    stopSe.preload = 'auto';
    const bonusEndSe = new Audio('SlotMp3/ジャグラーボーナス終.mp3');
    stopSe.preload = 'auto';
    const janbariSe = new Audio('SlotMp3/ジャグラー ジャンバリ .mp3');
    stopSe.preload = 'auto';
    janbariSe.loop = true;


    class Panel {
      constructor() {
        const section = document.createElement('section');
        section.classList.add('panel');

        this.img = document.createElement('img');
        this.img.src = this.getRandomImage();

        this.timeoutId = undefined;

        this.stop = document.createElement('div');
        this.stop.textContent = 'STOP';
        this.stop.classList.add('stop', 'inactive');

        this.stop.addEventListener('click', () => {
          if (this.stop.classList.contains('inactive')) {
            return;
          }
          stopSe.currentTime = 0;
          stopSe.play();
          this.stop.classList.add('inactive');
          clearTimeout(this.timeoutId);

          panelsLeft--;

          if (gogoLamp?.matches('.glow')) {
            this.img.src = 'SlotImg/seven.png';
          }

          if (bonus === true) {
            if (clownCounter === 0) {
              this.img.src = 'SlotImg/clown.png';
            } else {
              this.img.src = 'SlotImg/grape.png';
            }
          }
          if (janbari === true) {
            if (clownCounter === 0) {
              this.img.src = 'SlotImg/clown.png';
            } else {
              this.img.src = 'SlotImg/grape.png';
            }
          }

          if (panelsLeft === 2) {
            panel1Pattern = this.img.src;
          }
          if (panelsLeft === 1) {
            panel2Pattern = this.img.src;
          }
          if (panelsLeft === 0) {
            panel3Pattern = this.img.src;
            console.log(panel1Pattern);
            console.log(panel2Pattern);
            console.log(panel3Pattern);
            normalCounter++;
            clownCounter = Math.floor(Math.random() * 5);
            console.log(`ノーマルカウンター${normalCounter}`);

            gogoLamp.classList.add('dim');
            gogoLamp.classList.remove('glow');

            if ([panel1Pattern, panel2Pattern, panel3Pattern].every(x => x === 'file:///Users/kajishoma/Desktop/MyVisitLog/SlotImg/grape.png')) {
              if (bonusCounter === bonusEnd) {
                bonus = false;
                console.log(`ボーナス${bonus}`);
                bonusSe.pause();
                bonusSe.currentTime = 0;
                bonusEndSe.currentTime = 0;
                bonusEndSe.play();
                bonusCounter = 0;
                normalCounter = 0;
              }
              if (janbariCounter === janbariEnd) {
                janbari = false;
                console.log(`ジャンバリ${janbari}`);
                janbariSe.pause();
                janbariSe.currentTime = 0;
                janbariCounter = 0;
                normalCounter = 0;
              }
              bonusCounter++;
              console.log(`ボーナスカウンター${bonusCounter}`);
              janbariCounter++;
              console.log(`ジャンバリカウンター${janbariCounter}`);
            }
            if ([panel1Pattern, panel2Pattern, panel3Pattern].every(x => x === 'file:///Users/kajishoma/Desktop/MyVisitLog/SlotImg/seven.png')) {
              if (normalCounter === 2) {
                janbari = true;
                console.log(`ジャンバリ${janbari}`);
                janbariSe.currentTime = 0;
                janbariSe.play();
              } else {
                bonus = true;
                console.log(`ボーナス${bonus}`);
                bonusSe.currentTime = 0;
                bonusSe.play();
              }
            } else {
              if ([panel1Pattern, panel2Pattern, panel3Pattern].every(x => x === 'file:///Users/kajishoma/Desktop/MyVisitLog/SlotImg/grape.png')) {
              } else {
                if (bonus === false) {
                  if (janbari === false) {
                    if (gogonumber === 1) {
                      gogoLamp.classList.remove('dim');
                      gogoLamp.classList.add('glow');

                      gogoSe.currentTime = 0;
                      gogoSe.play();
                    }
                  }

                }
              }
            }
          }

          if (panelsLeft === 0) {
            spin.classList.remove('inactive');
            panelsLeft = 3;
            checkResult();
          }
        });

        section.appendChild(this.img);
        section.appendChild(this.stop);

        const main = document.querySelector('#slot main');
        main.appendChild(section);
      }

      getRandomImage() {
        const images = [
          'SlotImg/seven.png',
          'SlotImg/bar.png',
          'SlotImg/bell.png',
          'SlotImg/cherry.png',
          'SlotImg/clown.png',
          'SlotImg/grape.png',
          'SlotImg/rhinoceros.png',
        ];
        return images[Math.floor(Math.random() * images.length)];
      }

      spin() {
        this.img.src = this.getRandomImage();
        this.timeoutId = setTimeout(() => {
          this.spin();
        }, 50);
      }

      isUnmatched(p1, p2) {
        return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
      }

      unmatch() {
        this.img.classList.add('unmatched');
      }

      activate() {
        this.img.classList.remove('unmatched');
        this.stop.classList.remove('inactive');
      }
    }

    function checkResult() {
      if (panels[0].isUnmatched(panels[1], panels[2])) {
        panels[0].unmatch();
      }
      if (panels[1].isUnmatched(panels[0], panels[2])) {
        panels[1].unmatch();
      }
      if (panels[2].isUnmatched(panels[0], panels[1])) {
        panels[2].unmatch();
      }
    }

    const panels = [
      new Panel(),
      new Panel(),
      new Panel(),
    ];

    let panelsLeft = 3;
    let gogonumber = 0;
    const gogoProbability = 10;

    const spin = document.getElementById('spin');
    const spinSe = new Audio('SlotMp3/ジャグラー レバー.mp3');
    spinSe.preload = 'auto';
    spin.addEventListener('click', () => {
      if (spin.classList.contains('inactive')) {
        return;
      }
      spinSe.currentTime = 0;
      spinSe.play();

      gogonumber = Math.floor(Math.random() * gogoProbability);
      console.log(`ゴーゴーナンバー${gogonumber}`);
      spin.classList.add('inactive');

      panels.forEach(panel => {
        panel.activate();
        panel.spin();
      });
    });


    loginPage.hidden = true;
    welcome.hidden = true;
    contentList.hidden = true;
    comments.hidden = true;
    bye.hidden = true;
    slot.hidden = false;
  })






  // //class=memberをクリックしたときにmaskを消して、welcome,commentを表示
  // document.querySelectorAll('.member').forEach(el => {
  //   el.addEventListener('click', onClick);
  // });

  // function onClick(e) {
  //   document.body.classList.remove('mask');

  //   loginPage.hidden = true;
  //   welcome.hidden = false;
  //   comments.hidden = false;
  // }

}