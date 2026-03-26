#!/bin/bash                                              
  set -e                                                                                                                                                     
                                                             
  REPO="svlucero/pheron"                                                                                                                                     
  APP_NAME="Pheron"                                                                                                                                        
                                                                                                                                                             
  # Detect architecture                                                                                                                                    
  ARCH=$(uname -m)                                                                                                                                           
  if [ "$ARCH" = "arm64" ]; then                                                                                                                             
    ASSET_PATTERN="aarch64.dmg"                                                                                                                              
  elif [ "$ARCH" = "x86_64" ]; then                                                                                                                          
    ASSET_PATTERN="x64.dmg"                                                                                                                                
  else                                                                                                                                                       
    echo "Error: Unsupported architecture: $ARCH"                                                                                                          
    exit 1                                                                                                                                                   
  fi
                                                                                                                                                             
  # Get latest release download URL                       
  echo "Fetching latest release..."
  RELEASE_JSON=$(curl -sL "https://api.github.com/repos/${REPO}/releases/latest")                                                                            
  DOWNLOAD_URL=$(echo "$RELEASE_JSON" | grep "browser_download_url.*${ASSET_PATTERN}" | head -1 | cut -d '"' -f 4)                                                                                                                                                                                                                              
                                                                                                                                                             
  if [ -z "$DOWNLOAD_URL" ]; then                                                                                                                          
    echo "Error: Could not find DMG for ${ASSET_PATTERN}"
    exit 1                                                                                                                                                   
  fi
                                                                                                                                                             
  VERSION=$(echo "$DOWNLOAD_URL" | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)                                                                              
  echo "Installing ${APP_NAME} v${VERSION} (${ARCH})..."
                                                                                                                                                             
  # Download                                                                                                                                               
  DMG_FILE="/tmp/${APP_NAME}.dmg"                                                                                                                            
  curl -L -o "$DMG_FILE" "$DOWNLOAD_URL"                                                                                                                     
  
  # Mount and capture the actual mount point                                                                                                                 
  echo "Installing to /Applications..."                                                                                                                    
  MOUNT_POINT=$(hdiutil attach "$DMG_FILE" -readonly -noverify | grep "^/dev" | awk '{print $3}')                                                            
                                                                                                                                                           
  if [ -z "$MOUNT_POINT" ]; then                                                                                                                             
    echo "Error: Could not mount DMG"                                                                                                                      
    rm "$DMG_FILE"                                                                                                                                           
    exit 1                                                                                                                                                 
  fi

  # Find the .app inside the mounted volume                                                                                                                  
  APP_PATH=$(find "$MOUNT_POINT" -maxdepth 1 -name "*.app" | head -1)
                                                                                                                                                             
  if [ -z "$APP_PATH" ]; then                                                                                                                              
    echo "Error: No .app found in DMG at $MOUNT_POINT"                                                                                                       
    hdiutil detach "$MOUNT_POINT" -quiet                                                                                                                     
    rm "$DMG_FILE"
    exit 1                                                                                                                                                   
  fi                                                                                                                                                       

  cp -R "$APP_PATH" /Applications/                                                                                                                           
  hdiutil detach "$MOUNT_POINT" -quiet
  rm "$DMG_FILE"                                                                                                                                             
                                                                                                                                                           
  echo "Done! ${APP_NAME} v${VERSION} installed in /Applications."                                                                                           
  echo "Run it from Applications or with: open /Applications/${APP_NAME}.app"