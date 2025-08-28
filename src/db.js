import Dexie from 'dexie';

export const db = new Dexie('gledger_db');
db.version(1).stores({
  entries: 'date', // 1日1件の純収支
  items: '++id,name,price',
  settings: 'id'
});

export async function ensureDefaults(){
  const itemsCount = await db.items.count();
  if(itemsCount === 0){
    await db.items.bulkAdd([
      { name: 'コンビニコーヒー', price: 150 },
      { name: '缶ビール', price: 220 },
      { name: 'カップ麺', price: 250 },
      { name: '回転寿司5皿', price: 600 },
      { name: '牛丼並', price: 400 },
      { name: 'サラダチキン', price: 240 },
      { name: 'タクシー初乗り', price: 500 },
      { name: '映画1本', price: 1900 },
      { name: '文庫本', price: 900 },
      { name: '日帰り温泉', price: 800 },
      { name: 'Tシャツ', price: 1500 },
      { name: '音楽サブスク1ヶ月', price: 1080 }
    ]);
  }
}
