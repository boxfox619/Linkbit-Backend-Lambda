import { ItemObject } from "./Item";

export * from "./Item";
export * from "./Order";
export * from "./Receipt";

const tmpThumbnail = 'https://boxfoxs.tistory.com/attachment/cfile26.uf@99038C455D3D3E7539C438.svg';
export const items = [
  new ItemObject(1, 'Cass', tmpThumbnail, ['국산맥주', '인기', '라거', 'OB맥주'], 10000, 10),
  new ItemObject(2, 'Hite', tmpThumbnail, ['국산맥주', '인기', '라거', 'OB맥주'], 10000, 10),
  new ItemObject(3, '칭따오', tmpThumbnail, ['중국맥주', '인기', '수입맥주'], 10000, 10),
  new ItemObject(4, '벡스', tmpThumbnail, ['독일맥주', '인기', '수입맥주', '저가'], 12000, 100),
  new ItemObject(5, '마이셀', tmpThumbnail, ['독일맥주', '인기', '수입맥주'], 12000, 10),
  new ItemObject(6, '크롬바커', tmpThumbnail, ['독일맥주', '수입맥주'], 12000, 10),
  new ItemObject(7, '에딩거', tmpThumbnail, ['독일맥주', '라거', '수입맥주'], 12000, 10),
  new ItemObject(8, '벨기에', tmpThumbnail, ['수입맥주', '에일', '저가'], 10000, 10),
  new ItemObject(8, '호가든', tmpThumbnail, ['수입맥주', '라거', '인기', '유럽맥주'], 10000, 10),
  new ItemObject(9, '블루문', tmpThumbnail, ['수입맥주', '에일', '인기', '유럽맥주'], 10000, 12),
  new ItemObject(10, '듀벨', tmpThumbnail, ['수입맥주', 'OB맥주', '유럽맥주'], 10000, 10),
  new ItemObject(11, '스텔라', tmpThumbnail, ['수입맥주', 'OB맥주', '인기', '유럽맥주'], 10000, 10),
  new ItemObject(12, '오타크링거', tmpThumbnail, ['수입맥주', 'OB맥주', '인기'], 10000, 10),
  new ItemObject(13, 'Kloud', tmpThumbnail, ['국산맥주', '인기', '에일', 'OB맥주'], 10000, 11),
  new ItemObject(14, 'Fitz', tmpThumbnail, ['국산맥주', '인기', '저가'], 10000, 10),
  new ItemObject(15, 'Dry Finish', tmpThumbnail, ['국산맥주', '저가'], 10000, 15),
  new ItemObject(16, 'FilGood', tmpThumbnail, ['미국맥주', '수입맥주', 'OB맥주', '인기'], 10000, 10),
  new ItemObject(17, 'FilGood2', tmpThumbnail, ['미국맥주', '수입맥주', 'OB맥주'], 10000, 10)
];