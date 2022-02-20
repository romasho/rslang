import { Button, ButtonGroup, Menu, MenuItem } from '@mui/material';
import React from 'react';
import CHAPTERS from '../../../../../constants';
import { IChaptersProps } from '../../../../../interfaces/schoolbookInterfaces';


function ChapterBtn({ onChange, chapter }: IChaptersProps) {
  const [anchorChapter, setAnchorChapter] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(chapter);

  const handleOpenChapters = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorChapter(event.currentTarget);
  }

  const handleCloseChapters = (index: number | null) => {
    if (typeof index === 'number') {
      setSelectedIndex(index)
      onChange(index)
    }
    setAnchorChapter(null);
  }

  return (
    <>
      <ButtonGroup>
        <Button
          onClick={handleOpenChapters}
          sx={{ fontWeight: 700, fontSize: { xs: '10px', sm: '14px' } }}
        >
          {CHAPTERS[selectedIndex].name}
        </Button>
      </ButtonGroup>
      <Menu
        anchorEl={anchorChapter}
        keepMounted
        open={Boolean(anchorChapter)}
        onClose={() => handleCloseChapters(null)}
      >
        {
          CHAPTERS.map(item =>
            <MenuItem
              key={item.chapter}
              onClick={() => handleCloseChapters(item.chapter)}
            >{item.name}</MenuItem>
          )
        }
      </Menu>
    </>
  )
}

export default ChapterBtn;

// sx={{
//   color: 'black',
//   borderColor: 'black',
//   '&:hover': {
//     borderColor: 'black'
//   }
// }}