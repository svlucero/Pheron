#!/bin/bash
set -e

REPO="svlucero/pheron"
APP_NAME="Pheron"

# Detect OS and architecture
OS=$(uname -s)
ARCH=$(uname -m)

if [ "$OS" = "Darwin" ]; then
  # macOS
  if [ "$ARCH" = "arm64" ]; then
    ASSET_PATTERN="aarch64.dmg"
  elif [ "$ARCH" = "x86_64" ]; then
    ASSET_PATTERN="x64.dmg"
  else
    echo "Error: Unsupported architecture: $ARCH"
    exit 1
  fi
elif [ "$OS" = "Linux" ]; then
  # Linux
  if [ "$ARCH" = "aarch64" ]; then
    ASSET_PATTERN="aarch64.AppImage"
  elif [ "$ARCH" = "x86_64" ]; then
    ASSET_PATTERN="amd64.AppImage"
  else
    echo "Error: Unsupported architecture: $ARCH"
    exit 1
  fi
else
  echo "Error: Unsupported OS: $OS"
  exit 1
fi

# Get latest release download URL
echo "Fetching latest release..."
DOWNLOAD_URL=$(curl -sL "https://api.github.com/repos/${REPO}/releases/latest" \
  | grep "browser_download_url.*${ASSET_PATTERN}" \
  | head -1 \
  | cut -d '"' -f 4)

if [ -z "$DOWNLOAD_URL" ]; then
  echo "Error: Could not find asset for ${ASSET_PATTERN}"
  exit 1
fi

VERSION=$(echo "$DOWNLOAD_URL" | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
echo "Installing ${APP_NAME} v${VERSION} (${OS}/${ARCH})..."

if [ "$OS" = "Darwin" ]; then
  # Download and install DMG
  DMG_FILE="/tmp/${APP_NAME}.dmg"
  curl -L -o "$DMG_FILE" "$DOWNLOAD_URL"

  echo "Installing to /Applications..."
  hdiutil attach "$DMG_FILE" -quiet
  cp -R "/Volumes/${APP_NAME}/${APP_NAME}.app" /Applications/
  hdiutil detach "/Volumes/${APP_NAME}" -quiet
  rm "$DMG_FILE"

  echo "Done! ${APP_NAME} v${VERSION} installed in /Applications."
  echo "Run it from Applications or with: open /Applications/${APP_NAME}.app"

elif [ "$OS" = "Linux" ]; then
  # Download AppImage
  INSTALL_DIR="$HOME/.local/bin"
  mkdir -p "$INSTALL_DIR"
  APPIMAGE_FILE="${INSTALL_DIR}/${APP_NAME}.AppImage"

  curl -L -o "$APPIMAGE_FILE" "$DOWNLOAD_URL"
  chmod +x "$APPIMAGE_FILE"

  echo "Done! ${APP_NAME} v${VERSION} installed at ${APPIMAGE_FILE}."
  echo "Run it with: ${APPIMAGE_FILE}"

  # Add to PATH hint if needed
  if ! echo "$PATH" | grep -q "$INSTALL_DIR"; then
    echo ""
    echo "Tip: add ~/.local/bin to your PATH to run ${APP_NAME} from anywhere:"
    echo "  echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.bashrc && source ~/.bashrc"
  fi
fi
