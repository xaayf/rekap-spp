module.exports = Object.assign({content:['./src/index.src.html']},{
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['-apple-system', 'BlinkMacSystemFont', '"Plus Jakarta Sans"', 'SF Pro Text', 'system-ui', 'sans-serif'],
          },
          colors: {
            ios: {
              blue: '#007AFF',
              green: '#34C759',
              orange: '#FF9500',
              red: '#FF3B30',
              purple: '#AF52DE',
              indigo: '#5856D6',
              teal: '#5AC8FA',
              // Light mode
              bgLight: '#F2F2F7',
              cardLight: '#FFFFFF',
              borderLight: '#E5E5EA',
              grayLight: '#8E8E93',
              // Dark mode
              bgDark: '#000000',
              cardDark: '#1C1C1E',
              cardDarkAlt: '#2C2C2E',
              borderDark: '#38383A',
              grayDark: '#98989D'
            }
          },
          boxShadow: {
            'ios-card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
            'ios-card-dark': '0 2px 10px rgba(0, 0, 0, 0.4)',
            'ios-sheet': '0 -10px 35px rgba(0,0,0,0.18)'
          }
        }
      }
    });
