import { List, ListItem, ListItemText, SwipeableDrawer, Toolbar, Typography } from "@mui/material"
import React from "react"

import { useScreenWidth } from "@/hooks"
import { useI18n } from "@/i18n"

interface DetailDrawerProps {
  open: boolean
  onClose: () => void
  onOpen: () => void
  selectedItem: {
    title: string
    createDate: string
  } | null
}

const DetailDrawer: React.FC<DetailDrawerProps> = ({ open, onClose, onOpen, selectedItem }) => {
  const { isSmall } = useScreenWidth()
  const { t } = useI18n("DetailDrawer")

  return (
    <div>
      <SwipeableDrawer anchor={isSmall ? "bottom" : "right"} open={open} onClose={onClose} onOpen={onOpen}>
        {!isSmall && <Toolbar />}
        <List style={isSmall ? {} : { width: 250, padding: 10 }}>
          {selectedItem && (
            <>
              <ListItem>
                <ListItemText
                  primary={t("Title")}
                  secondary={<Typography variant="body1">{selectedItem.title}</Typography>}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={t("Created At")}
                  secondary={<Typography variant="body1">{selectedItem.createDate}</Typography>}
                />
              </ListItem>
            </>
          )}
        </List>
      </SwipeableDrawer>
    </div>
  )
}

export default DetailDrawer
